import csv
import os
from datetime import datetime

# Constants
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
PORTFOLIO_FILE = os.path.join(DATA_DIR, 'Cat_DDO_Portfolio.csv')
METADATA_FILE = os.path.join(DATA_DIR, 'Cat_DDO_Metadata.csv')

def to_number_loose(value):
    """
    Replicates the TypeScript toNumberLoose function.
    Handles inputs like "1,000", "-", "–", etc.
    """
    if value is None:
        return 0
    s = str(value).strip()
    # Handle common 'empty' or 'dash' representations in the CSV
    if s == '' or s in ['-', '–', '—']:
        return 0
    # Remove commas for parsing
    normalized = s.replace(',', '')
    try:
        return float(normalized)
    except ValueError:
        return 0

def load_csv(path):
    """
    Reads CSV with latin1 encoding (standard for Excel-saved CSVs containing 
    special chars) and returns a list of dictionaries.
    """
    if not os.path.exists(path):
        print(f"Error: File not found at {path}")
        return []
    
    # latin1 encoding is crucial for special characters like 'Ñ' or 'ç'
    with open(path, mode='r', encoding='latin1') as f:
        # We manually handle headers to ensure they are stripped of whitespace
        reader = csv.reader(f)
        headers = next(reader, [])
        headers = [h.strip() for h in headers]
        
        rows = []
        for row_values in reader:
            row_dict = {}
            for i, val in enumerate(row_values):
                if i < len(headers):
                    row_dict[headers[i]] = val.strip()
            rows.append(row_dict)
            
    return rows

def load_portfolio():
    """
    Loads portfolio data and filters out 'Dropped' projects.
    """
    rows = load_csv(PORTFOLIO_FILE)
    # The dashboard explicitly filters out rows where Status is 'Dropped'
    filtered = [r for r in rows if r.get('Status', '') != 'Dropped']
    return filtered

def load_metadata():
    """
    Loads metadata (Update Date, Last FY) from metadata CSV.
    """
    rows = load_csv(METADATA_FILE)
    meta = {}
    for r in rows:
        key = r.get('Key', '')
        val = r.get('Value', '')
        if key:
            meta[key] = val
    return meta

def check_group_integrity(rows):
    """
    Performs basic integrity checks on the data.
    """
    print("\n--- Data Integrity Checks ---")
    
    # 1. Check for Duplicate P# (Project IDs)
    p_ids = [r.get('P#') for r in rows if r.get('P#')]
    if len(p_ids) != len(set(p_ids)):
        print("WARNING: Duplicate Project IDs found!")
        from collections import Counter
        duplicates = [item for item, count in Counter(p_ids).items() if count > 1]
        print(f"Duplicates: {duplicates}")
    else:
        print("OK: No duplicate Project IDs.")

    # 2. Check for Date Formats (Approval Date)
    # Format expected usually DD/MM/YYYY or similar. The dashboard doesn't strictly parse them for aggregation,
    # but it's good to check.
    invalid_dates = []
    for r in rows:
        d = r.get('Approval Date', '')
        if d:
            try:
                # Assuming DD/MM/YYYY format based on CSV inspection (e.g., 16/09/2008)
                datetime.strptime(d, '%d/%m/%Y')
            except ValueError:
                invalid_dates.append(f"{r.get('P#')}: {d}")
    
    if invalid_dates:
        print(f"WARNING: Found {len(invalid_dates)} rows with potentially invalid Approval Date format (expected DD/MM/YYYY):")
        # Print first 5
        for inv in invalid_dates[:5]:
            print(f"  - {inv}")
    else:
        print("OK: All Approval Dates seem valid (DD/MM/YYYY).")

def run_tests():
    print("==========================================")
    print("     Cat DDO Portfolio Verification       ")
    print("==========================================")
    print(f"Parsing: {PORTFOLIO_FILE}")
    
    portfolio_rows = load_portfolio()
    metadata = load_metadata()
    
    print(f"Total Rows (excluding Dropped): {len(portfolio_rows)}")
    
    check_group_integrity(portfolio_rows)
    
    # --- Replicating dashboard aggregation logic ---
    
    # Categorize rows
    active_closed = [r for r in portfolio_rows if r.get('Status') in ['Active', 'Closed']]
    active_only = [r for r in portfolio_rows if r.get('Status') == 'Active']
    closed_only = [r for r in portfolio_rows if r.get('Status') == 'Closed']
    pipeline_only = [r for r in portfolio_rows if r.get('Status') == 'Pipeline']
    
    num_active_closed = len(active_closed)
    
    # Unique countries in Active/Closed
    unique_countries = set()
    for r in active_closed:
        c = r.get('Country', '')
        if c:
            unique_countries.add(c)
    num_unique_countries = len(unique_countries)
    
    num_closed = len(closed_only)
    num_pipeline = len(pipeline_only)
    
    # --- Financial Aggregations ---
    # NOTE: Financial values in CSV are strings with commas. We use to_number_loose to convert.
    # We use 1e6 for Millions and 1e9 for Billions.
    
    # Total Disbursements (Active + Closed)
    # Column: 'Disbursements - Cat DDO Cum.'
    disb_tot = sum(to_number_loose(r.get('Disbursements - Cat DDO Cum.')) for r in active_closed)
    disb_tot_billion =  float(f"{disb_tot / 1e9:.1f}")
    
    # Disbursements by Source (IBRD vs IDA) in Active/Closed
    # The dashboard sums the explicit IBRD and IDA columns regardless of the 'Source' column value.
    ibrd_val = sum(to_number_loose(r.get('Disbursements - Cat DDO Cum. (IBRD)')) for r in active_closed) / 1e6
    ida_val = sum(to_number_loose(r.get('Disbursements - Cat DDO Cum. (IDA)')) for r in active_closed) / 1e6
    total_val = ibrd_val + ida_val
    
    ibrd_share = float(f"{(ibrd_val / total_val * 100):.1f}") if total_val > 0 else 0
    ida_share = float(f"{(ida_val / total_val * 100):.1f}") if total_val > 0 else 0
    
    # Undisbursed amounts (Active only)
    # Column: 'CAT DDO Undisbursed'
    undisb_raw = sum(to_number_loose(r.get('CAT DDO Undisbursed')) for r in active_only)
    undisb_billion = float(f"{undisb_raw / 1e9:.1f}")
    
    # Top Regions Undisbursed (Active Only)
    by_region = {}
    for r in active_only:
        reg = r.get('Region', '')
        val = to_number_loose(r.get('CAT DDO Undisbursed'))
        by_region[reg] = by_region.get(reg, 0) + val
        
    sorted_regions = sorted([(k, v/1e6) for k, v in by_region.items()], key=lambda x: x[1], reverse=True)
    
    top_region, top_val = sorted_regions[0] if len(sorted_regions) > 0 else ('', 0)
    second_region, second_val = sorted_regions[1] if len(sorted_regions) > 1 else ('', 0)
    
    total_undis_m = sum(x[1] for x in sorted_regions) or 1
    top_share = float(f"{(top_val / total_undis_m * 100):.1f}")
    second_share = float(f"{(second_val / total_undis_m * 100):.1f}")
    
    # Pipeline breakdown by Source
    # NOTE: Potential logic gap - if Source is 'IBRD and IDA', it might be excluded!
    pipe_ida = [r for r in pipeline_only if r.get('Source') == 'IDA']
    pipe_ibrd = [r for r in pipeline_only if r.get('Source') == 'IBRD']
    pipe_other = [r for r in pipeline_only if r.get('Source') not in ['IDA', 'IBRD']]
    
    if pipe_other:
        print(f"WARNING: Found {len(pipe_other)} Pipeline items with Source other than IDA or IBRD (e.g., Mixed). These are excluded from Dashboard text summary!")
        for p in pipe_other:
            print(f"  - {p.get('P#')} Source: {p.get('Source')}")
    
    pipe_ida_amt = sum(to_number_loose(r.get('Commitment (Cat DDO only)')) for r in pipe_ida) / 1e6
    pipe_ibrd_amt = sum(to_number_loose(r.get('Commitment (Cat DDO only)')) for r in pipe_ibrd) / 1e6
    
    # Mixed operations commitment summary
    mixed_active_closed = [r for r in active_closed if r.get('Standalone/Mixed') == 'Mixed']
    mixed_all_commit = sum(to_number_loose(r.get('Commitment (All = DPO + Cat DDO)')) for r in mixed_active_closed) / 1e6
    mixed_cat_commit = sum(to_number_loose(r.get('Commitment (Cat DDO only)')) for r in mixed_active_closed) / 1e6
    
    # --- Table Aggregation ---
    
    # IBRD Table Row
    ibrd_disb_table = sum(to_number_loose(r.get('Disbursements - Cat DDO Cum. (IBRD)')) for r in active_closed)
    ibrd_undis_table = sum(to_number_loose(r.get('CAT DDO Undisbursed (IBRD)')) for r in active_only)
    ibrd_pipe_table = sum(to_number_loose(r.get('Commitment (Cat DDO only)')) for r in pipe_ibrd)
    
    # IDA Table Row
    ida_disb_table = sum(to_number_loose(r.get('Disbursements - Cat DDO Cum. (IDA)')) for r in active_closed)
    ida_undis_table = sum(to_number_loose(r.get('CAT DDO Undisbursed (IDA)')) for r in active_only)
    ida_pipe_table = sum(to_number_loose(r.get('Commitment (Cat DDO only)')) for r in pipe_ida)
    
    to_millions = lambda x: float(f"{x/1e6:.1f}")
    
    table_ibrd = {
        'Disbursed': to_millions(ibrd_disb_table),
        'Undisbursed': to_millions(ibrd_undis_table),
        'Pipeline': to_millions(ibrd_pipe_table)
    }
    table_ida = {
        'Disbursed': to_millions(ida_disb_table),
        'Undisbursed': to_millions(ida_undis_table),
        'Pipeline': to_millions(ida_pipe_table)
    }
    table_total = {
        'Disbursed': float(f"{table_ibrd['Disbursed'] + table_ida['Disbursed']:.1f}"),
        'Undisbursed': float(f"{table_ibrd['Undisbursed'] + table_ida['Undisbursed']:.1f}"),
        'Pipeline': float(f"{table_ibrd['Pipeline'] + table_ida['Pipeline']:.1f}")
    }
    
    # --- Print Outputs ---
    
    print("\n--- Dashboard Summary Text Figures ---")
    print(f"Update Date: {metadata.get('Update_Month')} {metadata.get('Update_Year')}")
    print(f"1. Total Active/Closed: {num_active_closed}")
    print(f"2. Total Unique Countries: {num_unique_countries}")
    print(f"3. Total Closed: {num_closed}")
    print(f"4. Total Pipeline: {num_pipeline}")
    print(f"5. Total Disbursed (Billion): ${disb_tot_billion}")
    print(f"6. IBRD Share of Disbursed: {ibrd_share}%")
    print(f"7. IDA Share of Disbursed: {ida_share}%")
    print(f"8. Undisbursed Balance (Billion): ${undisb_billion}")
    print(f"9. Top Region Undisbursed: {top_region} (${float(f'{top_val:.1f}')}M, {top_share}%)")
    print(f"10. 2nd Region Undisbursed: {second_region} (${float(f'{second_val:.1f}')}M, {second_share}%)")
    print(f"11. Pipeline IDA: {len(pipe_ida)} ops, ${float(f'{pipe_ida_amt:.1f}')}M")
    print(f"12. Pipeline IBRD: {len(pipe_ibrd)} ops, ${float(f'{pipe_ibrd_amt:.1f}')}M")
    print(f"13. Mixed Ops (All Commit): ${float(f'{mixed_all_commit:.1f}')}M")
    print(f"14. Mixed Ops (Cat Commit): ${float(f'{mixed_cat_commit:.1f}')}M")
    
    print("\n--- Dashboard Summary Table Figures (Millions) ---")
    print(f"{'Source':<10} | {'Disbursed':<12} | {'Undisbursed':<12} | {'Pipeline':<12}")
    print("-" * 52)
    print(f"{'IBRD':<10} | {table_ibrd['Disbursed']:<12} | {table_ibrd['Undisbursed']:<12} | {table_ibrd['Pipeline']:<12}")
    print(f"{'IDA':<10} | {table_ida['Disbursed']:<12} | {table_ida['Undisbursed']:<12} | {table_ida['Pipeline']:<12}")
    print("-" * 52)
    print(f"{'Total':<10} | {table_total['Disbursed']:<12} | {table_total['Undisbursed']:<12} | {table_total['Pipeline']:<12}")

if __name__ == "__main__":
    run_tests()

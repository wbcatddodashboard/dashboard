
import os
import requests
import pandas as pd
import time
from datetime import datetime

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXISTING_CSV = 'src/data/Cat_DDO_Portfolio.csv'
OUTPUT_CSV = "get_data_scripts/data/Potential_New_Operations.csv"
API_URL = "https://search.worldbank.org/api/v2/projects"

# Search terms to focus on Cat DDO and its variations
SEARCH_TERMS = [
    "Catastrophe Deferred Drawdown Option",
    "Catastrophe Deferred Drawdown Options",
    "Catastrophe Deferred Drawdown",
    "Deferred Drawdown Option",
    "Deferred Drawdown Options",
    "Cat DDO",
    "Cat-DDO",
    "CATDDO",
    "CAT DDO",
    "CAT-DDO",
    "Catastrophe DDO",
    "Catastrophe-DDO",
    "DDO",
    "Deferred Drawdown",
    "Programmatic DDO",
    "Programmatic Deferred Drawdown",
    "DPL with Cat DDO",
    "DPL with Cat-DDO",
    "DPL with a Catastrophe Deferred Drawdown Option",
    "Development Policy Loan with Cat DDO",
    "Development Policy Loan with a Catastrophe Deferred Drawdown Option"
]

def fetch_projects(term):
    all_projects = {}
    rows = 100
    start = 0
    
    print(f"Searching for '{term}'...")
    while True:
        params = {
            "qterm": term,
            "format": "json",
            "rows": rows,
            "os": start,
            "fl": "id,project_name,countryname,status,board_approval_month,board_approval_year,fiscalyear,approvalfy,project_abstract,prodline,lendinginstr,lendinginstrtype"
        }
        
        data = None
        for attempt in range(3):
            try:
                response = requests.get(API_URL, params=params, timeout=60)
                response.raise_for_status()
                data = response.json()
                break
            except Exception as e:
                if attempt == 2:
                    print(f"Failed to fetch batch starting at {start} for '{term}': {e}")
                else:
                    time.sleep(2)
        
        if not data:
            break
            
        projects_data = data.get("projects", {})
        if not projects_data:
            break
        
        # Use dict to dedup by ID immediately
        for p in projects_data.values():
            p_id = p.get("id")
            if p_id:
                all_projects[p_id] = p
        
        total = int(data.get("total", 0))
        if start + rows >= total:
            break
        start += rows
        time.sleep(1)
            
    return all_projects

def main():
    # 1. Load existing P Codes
    try:
        existing_df = pd.read_csv(EXISTING_CSV)
        # Strip whitespace from columns
        existing_df.columns = existing_df.columns.str.strip()
        existing_ids = set(existing_df["P#"].astype(str).str.strip())
        print(f"Loaded {len(existing_ids)} existing project IDs.")
    except Exception as e:
        print(f"Error loading {EXISTING_CSV}: {e}")
        return

    # 2. Fetch all potential projects
    candidates = {}
    for term in SEARCH_TERMS:
        results = fetch_projects(term)
        candidates.update(results)
    
    print(f"Found {len(candidates)} total projects from API.")

    # 3. Filter for NEW projects
    new_projects = []
    for pid, p in candidates.items():
        if pid not in existing_ids:
            lendinginstr = str(p.get("lendinginstr", "")).lower()
            
            # Filter for Active status and 2025 approval year
            status = p.get("status", "")
            approval_year = str(p.get("board_approval_year", ""))
            if status == "Active" and (approval_year == "2025" or approval_year == "2026" or approval_year == "2027"):
                new_projects.append({
                    "P#": pid,
                    "Country": p.get("countryname", ""),
                    "Project Name": p.get("project_name", ""),
                    "Status": status,
                    "Fiscal Year": p.get("fiscalyear", ""),
                    "Approval FY": p.get("approvalfy", ""),
                    "Approval Date": f"{p.get('board_approval_month', '')} {p.get('board_approval_year', '')}".strip(),
                    "Lending Instrument": p.get("lendinginstr", ""),
                    "Lending Instrument Type": p.get("lendinginstrtype", ""),
                    "URL": f"https://projects.worldbank.org/en/projects-operations/project-detail/{pid}"
                })

    print(f"Identified {len(new_projects)} potential new projects NOT in current portfolio.")

    # 4. Save
    df = pd.DataFrame(new_projects)
    # Sort by Approval Date desc ideally, but string sort is okay for now
    df.to_csv(OUTPUT_CSV, index=False)
    print(f"Saved list to {OUTPUT_CSV}")

if __name__ == "__main__":
    main()

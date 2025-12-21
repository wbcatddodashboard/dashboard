"""
Compare P# in Cat_DDO_Portfolio.csv with P# in:
- Cat_DDO_Prior_Actions.csv
- Cat_DDO_Triggers.csv  
- Climate_cobenefits.csv
- gender_merged.csv
"""

import csv
import os

# Path to data directory
DATA_DIR = r'C:\Users\jqnmu\OneDrive\World_Bank_DRM\wbcatddodashboard\src\data'
GENDER_DIR = r'C:\Users\jqnmu\OneDrive\World_Bank_DRM\wbcatddodashboard\get_data_scripts\data\gender'


def read_pids_from_csv(filepath, column_name):
    """Read unique project IDs from a CSV file."""
    pids = set()
    # Try different encodings
    for encoding in ['utf-8-sig', 'utf-8', 'latin-1', 'cp1252']:
        try:
            with open(filepath, 'r', encoding=encoding) as f:
                reader = csv.DictReader(f)
                for row in reader:
                    pid = row.get(column_name, '').strip()
                    if pid:
                        pids.add(pid)
            return pids
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Could not read {filepath} with any encoding")


def main():
    # Read P# from each file
    portfolio_pids = read_pids_from_csv(
        os.path.join(DATA_DIR, 'Cat_DDO_Portfolio.csv'), 'P#'
    )
    prior_actions_pids = read_pids_from_csv(
        os.path.join(DATA_DIR, 'Cat_DDO_Prior_Actions.csv'), 'P#'
    )
    triggers_pids = read_pids_from_csv(
        os.path.join(DATA_DIR, 'Cat_DDO_Triggers.csv'), 'P#'
    )
    ccb_pids = read_pids_from_csv(
        os.path.join(DATA_DIR, 'Climate_cobenefits.csv'), 'Project ID'
    )
    gender_pids = read_pids_from_csv(
        os.path.join(GENDER_DIR, 'gender_merged.csv'), 'P#'
    )

    # Summary
    print('=== Summary ===')
    print(f'Portfolio: {len(portfolio_pids)} projects')
    print(f'Prior Actions: {len(prior_actions_pids)} projects')
    print(f'Triggers: {len(triggers_pids)} projects')
    print(f'Climate Cobenefits: {len(ccb_pids)} projects')
    print(f'Gender: {len(gender_pids)} projects')

    # Comparisons
    print('\n=== In Portfolio but NOT in Prior Actions ===')
    diff = portfolio_pids - prior_actions_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Prior Actions but NOT in Portfolio ===')
    diff = prior_actions_pids - portfolio_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Portfolio but NOT in Triggers ===')
    diff = portfolio_pids - triggers_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Triggers but NOT in Portfolio ===')
    diff = triggers_pids - portfolio_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Portfolio but NOT in Climate Cobenefits ===')
    diff = portfolio_pids - ccb_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Climate Cobenefits but NOT in Portfolio ===')
    diff = ccb_pids - portfolio_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Portfolio but NOT in Gender ===')
    diff = portfolio_pids - gender_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))

    print('\n=== In Gender but NOT in Portfolio ===')
    diff = gender_pids - portfolio_pids
    print(f'Count: {len(diff)}')
    print(sorted(diff))


if __name__ == '__main__':
    main()

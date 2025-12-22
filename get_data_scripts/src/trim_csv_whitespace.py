"""
Trim leading and trailing whitespace from all cells in CSV files.
Run this script from the data folder or modify the paths as needed.
"""

import csv
import os
# List of CSV files to process
CSV_FILES = [
    'Cat_DDO_Portfolio.csv',
    'Cat_DDO_Prior_Actions.csv',
    'Cat_DDO_Triggers.csv',
    'Cat_DDO_Metadata.csv',
    'Climate_cobenefits.csv'
]

def trim_csv(filepath):
    """Read a CSV file, trim all cells, and save it back."""
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return False
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8-sig', newline='') as f:
        reader = csv.reader(f)
        rows = [[cell.strip() for cell in row] for row in reader]
    
    # Write back with trimmed values
    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(rows)
    
    print(f"✓ Trimmed: {filepath}")
    return True

def main():
    # Get the directory where this script is located
    data_dir = r'C:\Users\jqnmu\OneDrive\World_Bank_DRM\wbcatddodashboard\src\data'
    os.chdir(data_dir)
    print(f"Working directory: {data_dir}\n")
    
    success_count = 0
    for filename in CSV_FILES:
        filepath = os.path.join(data_dir, filename)
        if trim_csv(filepath):
            success_count += 1
    
    print(f"\nDone! Processed {success_count}/{len(CSV_FILES)} files.")

if __name__ == "__main__":
    main()

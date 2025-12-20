#%%
"""
Script to merge all Excel files in the gender folder.
Checks that all files have the same headers before concatenating.
"""

import pandas as pd
from pathlib import Path


def merge_gender_files(
    input_folder: Path,
    output_file: Path,
    filter_file: Path | None = None,
    file_pattern: str = "*.xlsx",
) -> pd.DataFrame | None:
    """
    Merge all Excel files in the input folder into a single DataFrame.
    
    Excel file structure expected:
    - Row 0: Report Date metadata
    - Row 1: Empty
    - Row 2: Actual headers
    - Row 3: Empty
    - Row 4+: Data
    """
    files = sorted(input_folder.glob(file_pattern))    
    print(f"Found {len(files)} files to merge")
    
    dataframes: list[pd.DataFrame] = []
    reference_columns: list[str] | None = None
    
    for file in files:
        # Read file, skipping metadata rows
        df = pd.read_excel(file, skiprows=[0, 1, 3], header=0)
        df = df.dropna(how='all')
                
        reference_columns = list(df.columns)
        dataframes.append(df)
        print(f"  {file.name}: {len(df)} rows")
    
    # Merge and deduplicate
    merged_df = pd.concat(dataframes, ignore_index=True).drop_duplicates()
    
    # Keep only required columns
    merged_df = merged_df[["Project ID", "Country", "Approval FY", "Gender Tagged"]]
    
    # Clean Project ID: keep only first 7 characters
    original_ids = merged_df["Project ID"].astype(str)
    cleaned_ids = original_ids.str[:7]
    
    # Print modified IDs
    modified_mask = original_ids != cleaned_ids
    if modified_mask.any():
        print(f"\nModified Project IDs ({modified_mask.sum()}):")
        for orig in original_ids[modified_mask].unique():
            print(f"  {orig} -> {orig[:7]}")
    
    merged_df["Project ID"] = cleaned_ids
    
    # Rename Project ID to P#
    merged_df = merged_df.rename(columns={"Project ID": "P#"})
    
    # Filter to keep only projects from filter file
    if filter_file is not None:
        filter_df = pd.read_csv(filter_file)
        filter_df.columns = filter_df.columns.str.strip()
        filter_projects = set(filter_df["P#"].str.strip())
        before_count = len(merged_df)
        merged_df = merged_df[merged_df["P#"].isin(filter_projects)]
        print(f"\nFiltered to Cat DDO projects: {before_count} -> {len(merged_df)} rows")
    
    merged_df.to_csv(output_file, index=False, encoding='utf-8')
    
    print(f"\nMerged {len(dataframes)} files -> {len(merged_df)} rows")
    print(f"Saved to: {output_file}")
    
    return merged_df


if __name__ == "__main__":
    merge_gender_files(
        input_folder=Path("get_data_scripts/data/gender/raw"),
        output_file=Path("get_data_scripts/data/gender/gender_merged.csv"),
        filter_file=Path('src/data/Cat_DDO_Portfolio.csv'),
    )

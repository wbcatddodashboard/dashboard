"""
Update Cat_DDO_Portfolio.csv, Cat_DDO_Triggers.csv, and Climate_cobenefits.csv
by extracting and formatting them from Cat_DDO_Master.csv.
"""

import os
import csv
import pandas as pd

# Define paths relative to the script location
script_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.abspath(os.path.join(script_dir, '..', '..', 'src', 'data'))
backup_dir = os.path.join(data_dir, 'Backup-30June2026')

# Load master dataframe directly in utf-8-sig
master_path = os.path.join(data_dir, 'Cat_DDO_Master.csv')
df_master = pd.read_csv(master_path, encoding='utf-8-sig')

# Clean column names (strip whitespace)
df_master.columns = df_master.columns.str.strip()

# --- 1. Recreate Cat_DDO_Portfolio.csv ---
# Load portfolio headers from backup
portfolio_backup_path = os.path.join(backup_dir, 'Cat_DDO_Portfolio.csv')
with open(portfolio_backup_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    portfolio_headers = next(reader)
portfolio_headers = [h.strip() for h in portfolio_headers]

# Subset portfolio columns directly from master (using list comprehension to handle duplicate name selections)
df_portfolio = df_master[[col for col in portfolio_headers]].copy()
portfolio_output_path = os.path.join(data_dir, 'Cat_DDO_Portfolio.csv')
df_portfolio.to_csv(portfolio_output_path, index=False, encoding='latin1', errors='replace')
print(f"✓ Exported: {portfolio_output_path}")

# --- 2. Recreate Cat_DDO_Triggers.csv ---
# Load triggers headers from backup
triggers_backup_path = os.path.join(backup_dir, 'Cat_DDO_Triggers.csv')
with open(triggers_backup_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    triggers_headers = next(reader)
triggers_headers = [h.strip() for h in triggers_headers]

# Map columns for triggers by renaming Description and Source
df_triggers = df_master.rename(columns={'Description': 'Project Name', 'Source': 'Project Financier'}).copy()
df_triggers['Fiscal Year'] = df_triggers['Fiscal Year'].astype(str).str.strip().str.replace('FY', '20')

# Ensure exact columns and order
df_triggers = df_triggers[triggers_headers]
triggers_output_path = os.path.join(data_dir, 'Cat_DDO_Triggers.csv')
df_triggers.to_csv(triggers_output_path, index=False, encoding='latin1', errors='replace')
print(f"✓ Exported: {triggers_output_path}")

# --- 3. Recreate Climate_cobenefits.csv ---
# Load cobenefits headers from backup
cobenefits_backup_path = os.path.join(backup_dir, 'Climate_cobenefits.csv')
with open(cobenefits_backup_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    cobenefits_headers = next(reader)
cobenefits_headers = [h.strip() for h in cobenefits_headers]

# Map columns for cobenefits by renaming P# and Fiscal Year
df_cobenefits = df_master.rename(columns={'P#': 'Project ID', 'Fiscal Year': 'FY'}).copy()

# Dynamically construct Fig_id column
df_cobenefits['Fig_id'] = df_cobenefits['Country'].astype(str) + ' (' + df_cobenefits['FY'].astype(str) + ')'

# Filter out rows that do not have climate cobenefits data
df_cobenefits = df_cobenefits.dropna(subset=['Adaptation CCB %', 'Mitigation CCB %', 'Total CCB %'], how='all')

# Format percentage columns to match original precision
for col in ['Adaptation CCB %', 'Mitigation CCB %', 'Total CCB %']:
    df_cobenefits[col] = pd.to_numeric(df_cobenefits[col], errors='coerce')
    df_cobenefits[col] = df_cobenefits[col].apply(lambda x: int(x) if pd.notnull(x) and x == int(x) else x)

# Ensure exact columns and order
df_cobenefits = df_cobenefits[cobenefits_headers]
cobenefits_output_path = os.path.join(data_dir, 'Climate_cobenefits.csv')
df_cobenefits.to_csv(cobenefits_output_path, index=False, encoding='latin1', errors='replace')
print(f"✓ Exported: {cobenefits_output_path}")

# --- 4. Format Cat_DDO_Prior_Actions.csv as Latin-1 ---
prior_actions_path = os.path.join(data_dir, 'Cat_DDO_Prior_Actions.csv')
try:
    df_pa = pd.read_csv(prior_actions_path, encoding='utf-8-sig')
except UnicodeDecodeError:
    df_pa = pd.read_csv(prior_actions_path, encoding='latin1')
df_pa.columns = df_pa.columns.str.strip()
df_pa.to_csv(prior_actions_path, index=False, encoding='latin1', errors='replace')
print(f"✓ Formatted and saved in Latin-1: {prior_actions_path}")

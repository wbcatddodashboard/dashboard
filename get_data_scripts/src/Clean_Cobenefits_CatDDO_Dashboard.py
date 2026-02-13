#%%
'''This opens the file downloaded from the One Target Map Dashboards, and extracts the small part to be shared for the Cat DDO dashboard.'''

import pandas as pd

# Configuration
CatDDO_data = 'src/data/Cat_DDO_Portfolio.csv'
PDOS = pd.read_csv(CatDDO_data)
Cat_DDO_list = list(PDOS['P#'])

#%%

df = pd.read_csv('get_data_scripts/data/climate-cobenefits/project_details_complete_unfiltered_2025-12-19.csv')
df = df.loc[(df['Project ID'].isin(Cat_DDO_list)) & (df['Project Assessed'] == 'Assessed')] # Filter relevant operations

# Create percentages
df['Adaptation CCB %'] = round(100 * df['Net IDA/IBRD Adaptation ($M)'] / df['Total IDA/IBRD Commitment ($M)'], 2)
df['Mitigation CCB %'] = round(100 * df['Net IDA/IBRD Mitigation ($M)'] / df['Total IDA/IBRD Commitment ($M)'], 2)
df['Total CCB %'] = round(df['Adaptation CCB %'] + df['Mitigation CCB %'], 2)

cols = ['Project ID', 'Country', 'FY', 'Adaptation CCB %', 'Mitigation CCB %', 'Total CCB %']
df = df[cols]
df['Fig_id'] = df['Country']  + ' (' + df['FY'] + ')' # Create id for the figure

df = df.drop_duplicates()
print("Number of unique Project IDs:", df['Project ID'].nunique())
print("Number of rows:", len(df))
if df['Project ID'].nunique() != len(df):
    print("Error: Number of unique Project IDs does not match number of rows.")
df.to_csv('get_data_scripts/data/climate-cobenefits/Climate_cobenefits_updated.csv', index=False)

# %%

/**
 * Column explanations for the Portfolio Data table
 *
 * This file contains hardcoded explanations for each column in the DPF Cat DDO Portfolio Data table.
 * You can manually edit these descriptions as needed.
 */

export interface ColumnExplanation {
  columnName: string;
  explanation: string;
}

export const PORTFOLIO_DATA_COLUMN_EXPLANATIONS: ColumnExplanation[] = [
  {
    columnName: 'P#',
    explanation:
      'Project Number - Unique identifier assigned to each World Bank project',
  },
  {
    columnName: 'ISO3',
    explanation:
      'Three-letter country code based on ISO 3166-1 alpha-3 standard',
  },
  {
    columnName: 'Country',
    explanation: 'Name of the country where the project is being implemented',
  },
  {
    columnName: 'PDO',
    explanation:
      'Project Development Objective - The overall goal and intended outcomes of the project',
  },
  {
    columnName: 'Description',
    explanation: 'Full project name and description',
  },
  {
    columnName: 'Fiscal Year',
    explanation:
      'World Bank fiscal year when the project was approved (FY runs from July 1 to June 30)',
  },
  {
    columnName: 'Generation',
    explanation:
      'Generation number of the Cat DDO for the country (e.g., 1 = first Cat DDO, 2 = second Cat DDO)',
  },
  {
    columnName: 'Status',
    explanation: 'Current status of the project (Active or Closed)',
  },
  {
    columnName: 'ICR',
    explanation:
      'Implementation Completion Report - Indicates whether an ICR has been completed (Yes/No)',
  },
  {
    columnName: 'Activation for COVID',
    explanation:
      'Indicates whether the Cat DDO was activated in response to the COVID-19 pandemic',
  },
  {
    columnName: 'Region',
    explanation:
      'World Bank region (e.g., LCR=Latin America & Caribbean, EAP=East Asia & Pacific, AFE=Africa East, etc.)',
  },
  {
    columnName: 'SIDS',
    explanation:
      'Small Island Developing States - Indicates if the country is classified as a SIDS',
  },
  {
    columnName: 'Global Practice',
    explanation:
      'World Bank Global Practice responsible for the project (e.g., Urban Resilience and Land, Macroeconomics Trade and Investment)',
  },
  {
    columnName: 'Renewal (times)',
    explanation: 'Number of times the Cat DDO has been renewed',
  },
  {
    columnName: 'Standalone/Mixed',
    explanation:
      'Indicates whether the Cat DDO is standalone or mixed with other Development Policy Financing',
  },
  {
    columnName: 'Source',
    explanation:
      'Financing source - IBRD (International Bank for Reconstruction and Development) or IDA (International Development Association)',
  },
  {
    columnName: 'Outcomes',
    explanation:
      'Overall assessment of project outcomes (e.g., Satisfactory, Moderately Satisfactory). ICRR data.',
  },
  {
    columnName: 'Risk to Development Outcome',
    explanation:
      'Assessment of risks that could affect the sustainability of development outcomes. ICRR data.',
  },
  {
    columnName: 'Bank Performance',
    explanation:
      'Overall assessment of World Bank performance during project implementation. ICRR data.',
  },
  {
    columnName: 'Borrower Performance',
    explanation:
      'Assessment of borrower/government performance during project implementation. ICRR data.',
  },
  {
    columnName: 'Relevance of Prior Actions',
    explanation:
      'Assessment of how relevant the prior actions were to achieving the PDO. ICRR data.',
  },
  {
    columnName: 'Achievement of Objectives',
    explanation:
      'Assessment of the extent to which project objectives were achieved. ICRR data.',
  },
  {
    columnName: 'Quality at Entry (Bank)',
    explanation:
      'Assessment of the quality of project design and preparation by the World Bank. ICRR data.',
  },
  {
    columnName: 'Quality of Supervision (Bank)',
    explanation:
      'Assessment of the quality of World Bank supervision during implementation. ICRR data.',
  },
  {
    columnName: '# of Prior Actions',
    explanation: 'Number of prior actions included in the operation',
  },
  {
    columnName: '# of Indicators',
    explanation: 'Number of results indicators tracked for the project',
  },
  {
    columnName: 'Cofinancing (Y / N)',
    explanation:
      'Indicates whether the project has cofinancing from other development partners',
  },
  {
    columnName: 'Approval Date',
    explanation: 'Date when the project was approved by the World Bank Board',
  },
  {
    columnName: 'Closing Date',
    explanation: 'Expected or actual date when the project closes',
  },
  {
    columnName: 'Commitment (All = DPO + Cat DDO)',
    explanation:
      'Total commitment amount including both the regular DPO and Cat DDO components (in USD)',
  },
  {
    columnName: 'Commitment (Cat DDO only)',
    explanation: 'Commitment amount for the Cat DDO component only (in USD)',
  },
  {
    columnName: 'Cat DDO Comm - IBRD',
    explanation: 'Cat DDO commitment amount financed by IBRD (in USD)',
  },
  {
    columnName: 'Cat DDO Comm - IDA',
    explanation: 'Cat DDO commitment amount financed by IDA (in USD)',
  },
  {
    columnName: 'Allocation To Respond to COVID-19 AMT',
    explanation:
      'Amount allocated specifically to respond to COVID-19 (in USD)',
  },
  {
    columnName: 'FY09 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2009 (in USD)',
  },
  {
    columnName: 'FY10 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2010 (in USD)',
  },
  {
    columnName: 'FY11 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2011 (in USD)',
  },
  {
    columnName: 'FY12 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2012 (in USD)',
  },
  {
    columnName: 'FY13 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2013 (in USD)',
  },
  {
    columnName: 'FY14 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2014 (in USD)',
  },
  {
    columnName: 'FY15 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2015 (in USD)',
  },
  {
    columnName: 'FY16 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2016 (in USD)',
  },
  {
    columnName: 'FY17 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2017 (in USD)',
  },
  {
    columnName: 'FY18 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2018 (in USD)',
  },
  {
    columnName: 'FY19 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2019 (in USD)',
  },
  {
    columnName: 'FY20 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2020 (in USD)',
  },
  {
    columnName: 'FY21 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2021 (in USD)',
  },
  {
    columnName: 'FY22 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2022 (in USD)',
  },
  {
    columnName: 'FY23 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2023 (in USD)',
  },
  {
    columnName: 'FY24 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2024 (in USD)',
  },
  {
    columnName: 'FY25 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2025 (in USD)',
  },
  {
    columnName: 'FY26 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2026 (in USD)',
  },
  {
    columnName: 'FY27 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2027 (in USD)',
  },
  {
    columnName: 'FY28 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2028 (in USD)',
  },
  {
    columnName: 'FY29 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2029 (in USD)',
  },
  {
    columnName: 'FY30 Cat DDO Disb.',
    explanation: 'Cat DDO disbursements made during Fiscal Year 2030 (in USD)',
  },
  {
    columnName: 'Disbursements - Cat DDO Cum.',
    explanation:
      'Cumulative Cat DDO disbursements across all fiscal years (in USD)',
  },
  {
    columnName: 'Disbursements - Cat DDO Cum. (IBRD)',
    explanation:
      'Cumulative Cat DDO disbursements from IBRD financing (in USD)',
  },
  {
    columnName: 'Disbursements - Cat DDO Cum. (IDA)',
    explanation: 'Cumulative Cat DDO disbursements from IDA financing (in USD)',
  },
  {
    columnName: 'CAT DDO Undisbursed',
    explanation: 'Total undisbursed Cat DDO amount remaining (in USD)',
  },
  {
    columnName: 'CAT DDO Undisbursed (IBRD)',
    explanation: 'Undisbursed Cat DDO amount from IBRD financing (in USD)',
  },
  {
    columnName: 'CAT DDO Undisbursed (IDA)',
    explanation: 'Undisbursed Cat DDO amount from IDA financing (in USD)',
  },
  {
    columnName: '% Undisbursed',
    explanation: 'Percentage of Cat DDO commitment that remains undisbursed',
  },
  {
    columnName: 'Gender Tagged',
    explanation:
      'Indicates whether the project has been tagged for gender considerations',
  },
  {
    columnName: 'Note',
    explanation: 'Additional notes or comments about the project',
  },
];

// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  buildSummaryTable,
  buildTextSummary,
  crosstabFiscalYearOperationType,
  crosstabFiscalYearRegion,
  crosstabRegionStatus,
  getFiscalYearLabel,
  getFyColumns,
  sumDisbursementsByCountry,
  sumDisbursementsByFyAndSource,
  sumDisbursementsByRegion,
  type PortfolioRow,
} from './portfolio';

const M = 1_000_000;

// A small, hand-checkable portfolio. Amounts are in US$.
function row(fields: Record<string, string>): PortfolioRow {
  return {
    'FY24 Cat DDO Disb.': '0',
    'FY25 Cat DDO Disb.': '0',
    'FY26 Cat DDO Disb.': '0',
    ...fields,
  };
}

const rows: PortfolioRow[] = [
  row({
    'P#': 'P1',
    Country: 'Peru',
    Region: 'LCR',
    Status: 'Closed',
    Source: 'IBRD',
    'Fiscal Year': 'FY24',
    'Standalone/Mixed': 'Standalone',
    'Commitment (All = DPO + Cat DDO)': String(100 * M),
    'Commitment (Cat DDO only)': String(100 * M),
    'Disbursements - Cat DDO Cum.': String(100 * M),
    'Disbursements - Cat DDO Cum. (IBRD)': String(100 * M),
    'Disbursements - Cat DDO Cum. (IDA)': '0',
    'CAT DDO Undisbursed': '0',
    'FY24 Cat DDO Disb.': String(60 * M),
    'FY25 Cat DDO Disb.': String(40 * M),
  }),
  row({
    'P#': 'P2',
    Country: 'Kenya',
    Region: 'AFE',
    Status: 'Active',
    Source: 'IDA',
    'Fiscal Year': 'FY25',
    'Standalone/Mixed': 'Mixed',
    'Commitment (All = DPO + Cat DDO)': String(250 * M),
    'Commitment (Cat DDO only)': String(50 * M),
    'Disbursements - Cat DDO Cum.': String(20 * M),
    'Disbursements - Cat DDO Cum. (IBRD)': '0',
    'Disbursements - Cat DDO Cum. (IDA)': String(20 * M),
    'CAT DDO Undisbursed': String(30 * M),
    'CAT DDO Undisbursed (IDA)': String(30 * M),
    'FY25 Cat DDO Disb.': String(20 * M),
  }),
  row({
    'P#': 'P3',
    Country: 'Peru',
    Region: 'LCR',
    Status: 'Active',
    Source: 'IBRD',
    'Fiscal Year': 'FY25',
    'Standalone/Mixed': 'Mixed',
    'Commitment (All = DPO + Cat DDO)': String(300 * M),
    'Commitment (Cat DDO only)': String(200 * M),
    'Disbursements - Cat DDO Cum.': '0',
    'Disbursements - Cat DDO Cum. (IBRD)': '0',
    'Disbursements - Cat DDO Cum. (IDA)': '-',
    'CAT DDO Undisbursed': String(200 * M),
    'CAT DDO Undisbursed (IBRD)': String(200 * M),
  }),
  row({
    'P#': 'P4',
    Country: 'Nepal',
    Region: 'SAR',
    Status: 'Pipeline',
    Source: 'IDA',
    'Fiscal Year': 'FY26',
    'Standalone/Mixed': 'Standalone',
    'Commitment (Cat DDO only)': String(75 * M),
  }),
];

describe('getFiscalYearLabel', () => {
  it("turns 'FY24' into the short label ''24'", () => {
    expect(getFiscalYearLabel('FY24')).toBe("'24");
  });

  it('leaves other values alone and handles empty input', () => {
    expect(getFiscalYearLabel('2024')).toBe('2024');
    expect(getFiscalYearLabel('')).toBe('');
    expect(getFiscalYearLabel(undefined)).toBe('');
  });
});

describe('getFyColumns', () => {
  it('keeps FY columns up to and including Last_FY', () => {
    const { fyColumns, fyShortLabels } = getFyColumns(rows, {
      Last_FY: 'FY25',
    });
    expect(fyColumns).toEqual(['FY24 Cat DDO Disb.', 'FY25 Cat DDO Disb.']);
    expect(fyShortLabels).toEqual(["'24", "'25"]);
  });

  it('keeps every FY column when Last_FY is missing or unknown', () => {
    expect(getFyColumns(rows, {}).fyColumns).toHaveLength(3);
    expect(getFyColumns(rows, { Last_FY: 'FY99' }).fyColumns).toHaveLength(3);
  });

  it('returns nothing for an empty portfolio', () => {
    expect(getFyColumns([], { Last_FY: 'FY25' })).toEqual({
      fyColumns: [],
      fyShortLabels: [],
    });
  });
});

describe('sumDisbursementsByFyAndSource', () => {
  it('sums each FY column per lending source', () => {
    const cols = ['FY24 Cat DDO Disb.', 'FY25 Cat DDO Disb.'];
    expect(sumDisbursementsByFyAndSource(rows, cols)).toEqual({
      ibrd: [60 * M, 40 * M],
      ida: [0, 20 * M],
      ibrdAndIda: [0, 0],
    });
  });
});

describe('sumDisbursementsByRegion / ByCountry', () => {
  it('groups by region in millions, sorted by disbursements', () => {
    const result = sumDisbursementsByRegion(rows);
    expect(result.map((r) => r.region)).toEqual(['LCR', 'AFE', 'SAR']);
    expect(result[0]).toMatchObject({
      region: 'LCR',
      netCommitment: 300,
      disbursements: 100,
      rawNetCommitment: 300 * M,
    });
  });

  it('groups by country the same way', () => {
    const result = sumDisbursementsByCountry(rows);
    expect(result.map((r) => r.country)).toEqual(['Peru', 'Kenya', 'Nepal']);
    expect(result[0]).toMatchObject({ netCommitment: 300, disbursements: 100 });
  });
});

describe('crosstabs', () => {
  it('counts operations by fiscal year and region', () => {
    const { regions, years, matrix } = crosstabFiscalYearRegion(rows);
    expect(regions).toEqual(['AFE', 'LCR', 'SAR']);
    expect(years).toEqual(["'24", "'25", "'26"]);
    expect(matrix).toEqual([
      { year: "'24", AFE: 0, LCR: 1, SAR: 0 },
      { year: "'25", AFE: 1, LCR: 1, SAR: 0 },
      { year: "'26", AFE: 0, LCR: 0, SAR: 1 },
    ]);
  });

  it('counts operations by region and status', () => {
    const { statuses, matrix } = crosstabRegionStatus(rows);
    expect(statuses).toEqual(['Active', 'Closed', 'Pipeline']);
    expect(matrix).toEqual([
      { region: 'AFE', Active: 1, Closed: 0, Pipeline: 0 },
      { region: 'LCR', Active: 1, Closed: 1, Pipeline: 0 },
      { region: 'SAR', Active: 0, Closed: 0, Pipeline: 1 },
    ]);
  });

  it("counts operation types by year and always includes FY10 (''10)", () => {
    const { types, years, matrix } = crosstabFiscalYearOperationType(rows);
    expect(types).toEqual(['Mixed', 'Standalone']);
    expect(years).toEqual(["'10", "'24", "'25", "'26"]);
    expect(matrix[0]).toEqual({ year: "'10", Mixed: 0, Standalone: 0 });
    expect(matrix[2]).toEqual({ year: "'25", Mixed: 2, Standalone: 0 });
  });
});

describe('buildSummaryTable', () => {
  it('splits disbursed, undisbursed and pipeline amounts by source', () => {
    expect(buildSummaryTable(rows)).toEqual({
      table: {
        IBRD: { Disbursed: 100, Undisbursed: 200, Pipeline: 0 },
        IDA: { Disbursed: 20, Undisbursed: 30, Pipeline: 75 },
      },
      Total: { Disbursed: 120, Undisbursed: 230, Pipeline: 75 },
    });
  });
});

describe('buildTextSummary', () => {
  const summary = buildTextSummary(rows, {
    Update_Month: 'June',
    Update_Year: '2026',
  });

  it('computes the headline numbers', () => {
    expect(summary.numbers).toMatchObject({
      numActiveClosed: 3,
      numUniqueCountries: 2,
      numClosed: 1,
      numPipeline: 1,
      disbTotBillion: 0.1,
      ibrdShare: 83.3,
      idaShare: 16.7,
      undisbBillion: 0.2,
      topRegion: 'LCR',
      topVal: 200,
      secondRegion: 'AFE',
      secondVal: 30,
      pipelineIDA: 1,
      pipelineIDAmt: 75,
      pipelineIBRD: 0,
      mixedAllCommit: 550,
      mixedCatCommit: 250,
    });
  });

  it('writes the update date and the larger source into the text', () => {
    expect(summary.phrase1).toMatch(/^As of June, 2026, 3 Cat DDOs/);
    expect(summary.phrase3).toMatch(/^IBRD countries account for larger/);
  });
});

// @vitest-environment node
//
// Checks on the real CSVs in src/data. These catch the most common mistakes
// when uploading new data (see README, "Updating Data") before they reach the
// live site.
import { describe, expect, it } from 'vitest';
import {
  getClimateCsvPath,
  getPriorActionsCsvPath,
  readCsvAsObjects,
  toNumberLoose,
} from './csv';
import {
  buildSummaryTable,
  getFyColumns,
  loadMetadata,
  loadPortfolio,
} from './portfolio';

const portfolio = loadPortfolio();
const metadata = loadMetadata();

const isBlankOrNumber = (value: string | undefined) => {
  const s = (value ?? '').trim();
  if (s === '' || ['-', '–', '—'].includes(s)) return true;
  return Number.isFinite(Number(s.replace(/,/g, '')));
};

describe('Cat_DDO_Metadata.csv', () => {
  it('has the update date and a Last_FY like FY26', () => {
    expect(metadata.Update_Day).toMatch(/^\d{1,2}$/);
    expect(metadata.Update_Month).toBeTruthy();
    expect(metadata.Update_Year).toMatch(/^\d{4}$/);
    expect(metadata.Last_FY).toMatch(/^FY\d{2}$/);
  });

  it('has a Last_FY that matches a disbursement column in the portfolio', () => {
    const { fyColumns } = getFyColumns(portfolio, metadata);
    expect(fyColumns.at(-1)).toBe(`${metadata.Last_FY} Cat DDO Disb.`);
  });
});

describe('Cat_DDO_Portfolio.csv', () => {
  it('has operations', () => {
    expect(portfolio.length).toBeGreaterThan(0);
  });

  it('has the columns the dashboard reads', () => {
    const columns = Object.keys(portfolio[0]);
    for (const col of [
      'P#',
      'Country',
      'Region',
      'Status',
      'Source',
      'Fiscal Year',
      'Standalone/Mixed',
      'Commitment (All = DPO + Cat DDO)',
      'Commitment (Cat DDO only)',
      'Disbursements - Cat DDO Cum.',
      'Disbursements - Cat DDO Cum. (IBRD)',
      'Disbursements - Cat DDO Cum. (IDA)',
      'CAT DDO Undisbursed',
      'CAT DDO Undisbursed (IBRD)',
      'CAT DDO Undisbursed (IDA)',
    ]) {
      expect(columns, `missing column "${col}"`).toContain(col);
    }
  });

  it('has a unique, non-empty P# on every operation', () => {
    const ids = portfolio.map((r) => r['P#']);
    expect(ids.filter((id) => !id)).toEqual([]);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, 'duplicate P#').toEqual([]);
  });

  it('only uses known Status, Source and operation type values', () => {
    const bad = portfolio.filter(
      (r) =>
        !['Active', 'Closed', 'Pipeline'].includes(r.Status ?? '') ||
        !['IBRD', 'IDA', 'IBRD and IDA'].includes(r.Source ?? '') ||
        !['Standalone', 'Mixed'].includes(r['Standalone/Mixed'] ?? '')
    );
    expect(bad.map((r) => r['P#'])).toEqual([]);
  });

  it('has fiscal years written as FY plus two digits', () => {
    const bad = portfolio.filter(
      (r) => !/^FY\d{2}$/.test(r['Fiscal Year'] ?? '')
    );
    expect(bad.map((r) => `${r['P#']}: ${r['Fiscal Year']}`)).toEqual([]);
  });

  it('has only numbers (or blanks) in the amount columns', () => {
    const amountColumns = Object.keys(portfolio[0]).filter(
      (k) =>
        /^(Commitment|Cat DDO Comm|Disbursements|CAT DDO Undisbursed)/.test(
          k
        ) || /^FY\d{2} Cat DDO Disb\.$/.test(k)
    );
    const bad: string[] = [];
    for (const r of portfolio) {
      for (const col of amountColumns) {
        if (!isBlankOrNumber(r[col])) bad.push(`${r['P#']} ${col}: ${r[col]}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('has IBRD + IDA splits that add up to the totals', () => {
    const tolerance = 1; // US$
    const bad: string[] = [];
    for (const r of portfolio) {
      const pairs: Array<[string, string, string]> = [
        [
          'Disbursements - Cat DDO Cum.',
          'Disbursements - Cat DDO Cum. (IBRD)',
          'Disbursements - Cat DDO Cum. (IDA)',
        ],
        [
          'CAT DDO Undisbursed',
          'CAT DDO Undisbursed (IBRD)',
          'CAT DDO Undisbursed (IDA)',
        ],
      ];
      for (const [total, ibrd, ida] of pairs) {
        const diff =
          toNumberLoose(r[total]) -
          toNumberLoose(r[ibrd]) -
          toNumberLoose(r[ida]);
        if (Math.abs(diff) > tolerance) bad.push(`${r['P#']} ${total}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('produces a summary table whose totals equal IBRD + IDA', () => {
    const { table, Total } = buildSummaryTable(portfolio);
    for (const key of ['Disbursed', 'Undisbursed', 'Pipeline'] as const) {
      expect(Total[key]).toBeCloseTo(table.IBRD[key] + table.IDA[key], 1);
    }
    expect(Total.Disbursed).toBeGreaterThan(0);
  });
});

describe('related CSVs', () => {
  it('Cat_DDO_Prior_Actions.csv has the columns the dashboard reads', () => {
    const rows = readCsvAsObjects(getPriorActionsCsvPath());
    expect(rows.length).toBeGreaterThan(0);
    for (const col of ['P#', 'Country', 'DRM Pillar', 'Prior Action']) {
      expect(Object.keys(rows[0])).toContain(col);
    }
  });

  it('Climate_cobenefits.csv has percentage columns between 0 and 100', () => {
    const rows = readCsvAsObjects(getClimateCsvPath());
    expect(rows.length).toBeGreaterThan(0);
    const bad: string[] = [];
    for (const r of rows) {
      for (const col of [
        'Adaptation CCB %',
        'Mitigation CCB %',
        'Total CCB %',
      ]) {
        const v = toNumberLoose(r[col]);
        if (!isBlankOrNumber(r[col]) || v < 0 || v > 100) {
          bad.push(`${r['Project ID']} ${col}: ${r[col]}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

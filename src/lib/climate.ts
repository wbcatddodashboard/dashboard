import { getClimateCsvPath, readCsvAsObjects, toNumberLoose } from './csv';
import { loadPortfolio, PortfolioRow } from './portfolio';

export type ClimateRow = Record<string, string> & {
  'Project Assessed'?: string;
  'Project ID'?: string;
  Country?: string;
  FY?: string;
  'TN2: Net IDA/IBRD Adaptation ($M)'?: string | number;
  'TO6: Total IDA/IBRD Commitment ($M)'?: string | number;
  'TN3: Net IDA/IBRD Mitigation ($M)'?: string | number;
};

export type ClimateComputedRow = ClimateRow & {
  'Adaptation CCB %': number;
  'Mitigation CCB %': number;
  'Total CCB %': number;
};

export function loadClimateDataFiltered(): ClimateComputedRow[] {
  const rowsRaw = readCsvAsObjects(getClimateCsvPath());
  // Normalize column names that might have trailing spaces in source
  const normalizeRow = (r: Record<string, string>): ClimateRow => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(r)) {
      out[k.replace(/\s+$/g, '')] = v;
    }
    return out as ClimateRow;
  };

  const rows = rowsRaw.map(normalizeRow);

  const portfolio = loadPortfolio();
  const catDdoProjectIds = new Set(
    portfolio
      .map((r: PortfolioRow) => (r['P#'] ?? '').toString().trim())
      .filter(Boolean)
  );

  const filtered: ClimateComputedRow[] = rows.filter(
    (r) =>
      (r['Project Assessed'] ?? '').toString().trim() === 'Assessed' &&
      catDdoProjectIds.has((r['Project ID'] ?? '').toString().trim())
  ) as ClimateComputedRow[];

  // Preprocess and compute percentages
  for (const r of filtered) {
    const adapt = toNumberLoose(r['TN2: Net IDA/IBRD Adaptation ($M)']);
    const total = toNumberLoose(r['TO6: Total IDA/IBRD Commitment ($M)']);
    const mitig = toNumberLoose(r['TN3: Net IDA/IBRD Mitigation ($M)']);
    const adaptPct = total > 0 ? (adapt / total) * 100 : 0;
    const mitigPct = total > 0 ? (mitig / total) * 100 : 0;
    r['Adaptation CCB %'] = adaptPct;
    r['Mitigation CCB %'] = mitigPct;
    r['Total CCB %'] = adaptPct + mitigPct;
  }

  return filtered;
}

export function cobenefitsBars() {
  const portfolio = loadPortfolio();
  const standaloneIds = new Set(
    portfolio
      .filter(
        (r) => (r['Standalone/Mixed'] ?? '').toString().trim() === 'Standalone'
      )
      .map((r) => (r['P#'] ?? '').toString().trim())
      .filter(Boolean)
  );
  const mixedIds = new Set(
    portfolio
      .filter(
        (r) => (r['Standalone/Mixed'] ?? '').toString().trim() === 'Mixed'
      )
      .map((r) => (r['P#'] ?? '').toString().trim())
      .filter(Boolean)
  );

  const rows = loadClimateDataFiltered();

  const makeSeries = (ids: Set<string>) => {
    const selected = rows.filter((r) =>
      ids.has((r['Project ID'] ?? '').toString().trim())
    );
    selected.sort((a, b) => (b.FY ?? '').localeCompare(a.FY ?? ''));
    const labels = selected.map((r) => `${r.Country} (${r.FY})`);
    const adapt = selected.map((r) =>
      Number((r['Adaptation CCB %'] ?? 0).toFixed(2))
    );
    const mitig = selected.map((r) =>
      Number((r['Mitigation CCB %'] ?? 0).toFixed(2))
    );
    const total = selected.map((r) =>
      Number((r['Total CCB %'] ?? 0).toFixed(2))
    );
    const avgTotal = total.length
      ? Number((total.reduce((a, b) => a + b, 0) / total.length).toFixed(2))
      : 0;
    return { labels, adapt, mitig, total, avgTotal };
  };

  return {
    standalone: makeSeries(standaloneIds),
    mixed: makeSeries(mixedIds),
  };
}

export function cobenefitsSummary() {
  const rows = loadClimateDataFiltered();
  const total = rows.map((r) => r['Total CCB %']);
  const overallAvg = total.length
    ? Number((total.reduce((a, b) => a + b, 0) / total.length).toFixed(2))
    : 0;

  // Partition using portfolio Standalone/Mixed
  const portfolio = loadPortfolio();
  const standaloneIds = new Set(
    portfolio
      .filter(
        (r) => (r['Standalone/Mixed'] ?? '').toString().trim() === 'Standalone'
      )
      .map((r) => (r['P#'] ?? '').toString().trim())
      .filter(Boolean)
  );
  const mixedIds = new Set(
    portfolio
      .filter(
        (r) => (r['Standalone/Mixed'] ?? '').toString().trim() === 'Mixed'
      )
      .map((r) => (r['P#'] ?? '').toString().trim())
      .filter(Boolean)
  );

  const standalone = rows.filter((r) =>
    standaloneIds.has((r['Project ID'] ?? '').toString().trim())
  );
  const mixed = rows.filter((r) =>
    mixedIds.has((r['Project ID'] ?? '').toString().trim())
  );
  const avgStandalone = standalone.length
    ? Number(
        (
          standalone.reduce((acc, r) => acc + r['Total CCB %'], 0) /
          standalone.length
        ).toFixed(2)
      )
    : 0;
  const avgMixed = mixed.length
    ? Number(
        (
          mixed.reduce((acc, r) => acc + r['Total CCB %'], 0) / mixed.length
        ).toFixed(2)
      )
    : 0;

  return { overallAvg, avgStandalone, avgMixed };
}

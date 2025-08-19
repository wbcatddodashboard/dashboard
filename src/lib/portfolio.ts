import {
  getPortfolioCsvPath,
  getMetadataCsvPath,
  readCsvAsObjects,
  toNumberLoose,
} from './csv';

export type PortfolioRow = Record<string, string> & {
  Status?: string;
  'Fiscal Year'?: string;
  Region?: string;
  Source?: 'IBRD' | 'IDA' | string;
  Country?: string;
  'Standalone/Mixed'?: 'Standalone' | 'Mixed' | string;
  'P#'?: string;
};

export type Metadata = {
  Update_Month?: string;
  Update_Year?: string;
  Last_FY?: string; // e.g., FY24
};

export function loadMetadata(): Metadata {
  const rows = readCsvAsObjects(getMetadataCsvPath());
  const map: Record<string, string> = {};
  for (const row of rows) {
    const key = (row['Key'] ?? '').toString().trim();
    const value = (row['Value'] ?? '').toString().trim();
    if (key) map[key] = value;
  }
  return {
    Update_Month: map['Update_Month'],
    Update_Year: map['Update_Year'],
    Last_FY: map['Last_FY'],
  };
}

export function loadPortfolio(): PortfolioRow[] {
  const rows = readCsvAsObjects(getPortfolioCsvPath());
  return rows.filter(
    (r) => (r['Status'] ?? '').toString().trim() !== 'Dropped'
  );
}

export function getFiscalYearLabel(fy: string | undefined): string {
  if (!fy) return '';
  // Transform 'FY24' -> ''24
  return fy.startsWith('FY') ? `'${fy.slice(2)}` : fy;
}

export function getFyColumns(
  portfolioRows: PortfolioRow[],
  metadata: Metadata
): { fyColumns: string[]; fyShortLabels: string[] } {
  if (portfolioRows.length === 0) return { fyColumns: [], fyShortLabels: [] };
  const sample = portfolioRows[0];
  const allKeys = Object.keys(sample);
  const fyColumnsAll = allKeys.filter((k) => k.startsWith('FY'));

  let limitIndexExclusive = fyColumnsAll.length;
  const lastFy = metadata.Last_FY;
  if (lastFy) {
    const lastFyDisb = `${lastFy} Cat DDO Disb.`;
    const idx = fyColumnsAll.indexOf(lastFyDisb);
    if (idx >= 0) {
      limitIndexExclusive = idx + 1; // include last FY column
    }
  }
  const fyColumns = fyColumnsAll.slice(0, limitIndexExclusive);
  const fyShortLabels = fyColumns.map((c) => `'${c.slice(2, 4)}`);
  return { fyColumns, fyShortLabels };
}

export function sumDisbursementsByFyAndSource(
  portfolioRows: PortfolioRow[],
  fyColumns: string[]
) {
  const sumsIBRD = new Array<number>(fyColumns.length).fill(0);
  const sumsIDA = new Array<number>(fyColumns.length).fill(0);

  for (const row of portfolioRows) {
    const isIBRD = (row['Source'] ?? '').toString().trim() === 'IBRD';
    const isIDA = (row['Source'] ?? '').toString().trim() === 'IDA';
    fyColumns.forEach((col, i) => {
      const val = toNumberLoose(row[col]);
      if (isIBRD) sumsIBRD[i] += val;
      if (isIDA) sumsIDA[i] += val;
    });
  }
  return { ibrd: sumsIBRD, ida: sumsIDA };
}

export function sumDisbursementsByRegion(portfolioRows: PortfolioRow[]) {
  const regionMap = new Map<
    string,
    { netCommitment: number; disbursements: number }
  >();

  for (const row of portfolioRows) {
    const region = (row['Region'] ?? '').toString().trim();
    if (!region) continue;

    const netCommitment = toNumberLoose(row['Commitment (Cat DDO only)']) / 1e6;
    const disbursements =
      toNumberLoose(row['Disbursements - Cat DDO Cum.']) / 1e6;

    const existing = regionMap.get(region) || {
      netCommitment: 0,
      disbursements: 0,
    };
    regionMap.set(region, {
      netCommitment: existing.netCommitment + netCommitment,
      disbursements: existing.disbursements + disbursements,
    });
  }

  // Convert to array and sort by disbursements descending
  const regions = Array.from(regionMap.entries())
    .map(([region, data]) => ({
      region,
      netCommitment: data.netCommitment,
      disbursements: data.disbursements,
    }))
    .sort((a, b) => b.disbursements - a.disbursements);

  return regions;
}

export function sumDisbursementsByCountry(portfolioRows: PortfolioRow[]) {
  const countryMap = new Map<
    string,
    { netCommitment: number; disbursements: number }
  >();

  for (const row of portfolioRows) {
    const country = (row['Country'] ?? '').toString().trim();
    if (!country) continue;

    const netCommitment = toNumberLoose(row['Commitment (Cat DDO only)']) / 1e6;
    const disbursements =
      toNumberLoose(row['Disbursements - Cat DDO Cum.']) / 1e6;

    const existing = countryMap.get(country) || {
      netCommitment: 0,
      disbursements: 0,
    };
    countryMap.set(country, {
      netCommitment: existing.netCommitment + netCommitment,
      disbursements: existing.disbursements + disbursements,
    });
  }

  // Convert to array and sort by disbursements descending
  const countries = Array.from(countryMap.entries())
    .map(([country, data]) => ({
      country,
      netCommitment: data.netCommitment,
      disbursements: data.disbursements,
    }))
    .sort((a, b) => b.disbursements - a.disbursements);

  return countries;
}

export function crosstabFiscalYearRegion(portfolioRows: PortfolioRow[]) {
  // Build set of regions and fiscal years (formatted)
  const regionsSet = new Set<string>();
  const yearsSet = new Set<string>();
  for (const row of portfolioRows) {
    const region = (row['Region'] ?? '').toString().trim();
    if (region) regionsSet.add(region);
    const fyLabel = getFiscalYearLabel(
      (row['Fiscal Year'] ?? '').toString().trim()
    );
    if (fyLabel) yearsSet.add(fyLabel);
  }
  // Ensure "'10" exists as in the python script
  yearsSet.add("'10");

  const regions = Array.from(regionsSet).sort();
  const years = Array.from(yearsSet).sort();

  const matrix: Array<Record<string, number | string>> = years.map((year) => {
    const row: Record<string, number | string> = { year };
    regions.forEach((r) => (row[r] = 0));
    return row;
  });

  const yearIndex: Record<string, number> = Object.fromEntries(
    matrix.map((r, i) => [r.year as string, i])
  );

  for (const row of portfolioRows) {
    const region = (row['Region'] ?? '').toString().trim();
    if (!region) continue;
    const fyLabel = getFiscalYearLabel(
      (row['Fiscal Year'] ?? '').toString().trim()
    );
    if (!fyLabel) continue;
    const mi = yearIndex[fyLabel];
    if (mi == null) continue;
    const prev = Number(matrix[mi][region] ?? 0);
    matrix[mi][region] = prev + 1;
  }

  return { regions, years, matrix };
}

export function crosstabRegionStatus(portfolioRows: PortfolioRow[]) {
  const regions = Array.from(
    new Set(
      portfolioRows
        .map((r) => (r['Region'] ?? '').toString().trim())
        .filter(Boolean)
    )
  ).sort();
  const statuses = Array.from(
    new Set(
      portfolioRows
        .map((r) => (r['Status'] ?? '').toString().trim())
        .filter(Boolean)
    )
  ).sort();

  const matrix: Array<Record<string, number | string>> = regions.map(
    (region) => {
      const row: Record<string, number | string> = { region };
      statuses.forEach((s) => (row[s] = 0));
      return row;
    }
  );

  const regionIndex: Record<string, number> = Object.fromEntries(
    matrix.map((r, i) => [r.region as string, i])
  );

  for (const row of portfolioRows) {
    const region = (row['Region'] ?? '').toString().trim();
    const status = (row['Status'] ?? '').toString().trim();
    if (!region || !status) continue;
    const mi = regionIndex[region];
    const prev = Number(matrix[mi][status] ?? 0);
    matrix[mi][status] = prev + 1;
  }

  return { regions, statuses, matrix };
}

export function crosstabFiscalYearOperationType(portfolioRows: PortfolioRow[]) {
  const types = Array.from(
    new Set(
      portfolioRows
        .map((r) => (r['Standalone/Mixed'] ?? '').toString().trim())
        .filter(Boolean)
    )
  ).sort();
  const years = Array.from(
    new Set(
      portfolioRows
        .map((r) =>
          getFiscalYearLabel((r['Fiscal Year'] ?? '').toString().trim())
        )
        .filter(Boolean)
    )
  );
  years.push("'10");
  const uniqueYears = Array.from(new Set(years)).sort();

  const matrix: Array<Record<string, number | string>> = uniqueYears.map(
    (year) => {
      const row: Record<string, number | string> = { year };
      types.forEach((t) => (row[t] = 0));
      return row;
    }
  );

  const yearIndex: Record<string, number> = Object.fromEntries(
    matrix.map((r, i) => [r.year as string, i])
  );

  for (const row of portfolioRows) {
    const year = getFiscalYearLabel(
      (row['Fiscal Year'] ?? '').toString().trim()
    );
    const type = (row['Standalone/Mixed'] ?? '').toString().trim();
    if (!year || !type) continue;
    const mi = yearIndex[year];
    const prev = Number(matrix[mi][type] ?? 0);
    matrix[mi][type] = prev + 1;
  }

  return { types, years: uniqueYears, matrix };
}

export function buildSummaryTable(portfolioRows: PortfolioRow[]) {
  const isActiveClosed = (r: PortfolioRow) =>
    ['Active', 'Closed'].includes((r['Status'] ?? '').toString().trim());
  const isActive = (r: PortfolioRow) =>
    (r['Status'] ?? '').toString().trim() === 'Active';
  const isPipeline = (r: PortfolioRow) =>
    (r['Status'] ?? '').toString().trim() === 'Pipeline';

  let ibrdDisb = 0;
  let idaDisb = 0;
  let ibrdUndis = 0;
  let idaUndis = 0;
  let ibrdPipe = 0;
  let idaPipe = 0;

  for (const r of portfolioRows) {
    const source = (r['Source'] ?? '').toString().trim();
    if (isActiveClosed(r)) {
      ibrdDisb += toNumberLoose(r['Disbursements - Cat DDO Cum. (IBRD)']);
      idaDisb += toNumberLoose(r['Disbursements - Cat DDO Cum. (IDA)']);
    }
    if (isActive(r)) {
      ibrdUndis += toNumberLoose(r['CAT DDO Undisbursed (IBRD)']);
      idaUndis += toNumberLoose(r['CAT DDO Undisbursed (IDA)']);
    }
    if (isPipeline(r)) {
      if (source === 'IBRD')
        ibrdPipe += toNumberLoose(r['Commitment (Cat DDO only)']);
      if (source === 'IDA')
        idaPipe += toNumberLoose(r['Commitment (Cat DDO only)']);
    }
  }

  const toMillions = (x: number) => Number((x / 1e6).toFixed(1));
  const table = {
    IBRD: {
      Disbursed: toMillions(ibrdDisb),
      Undisbursed: toMillions(ibrdUndis),
      Pipeline: toMillions(ibrdPipe),
    },
    IDA: {
      Disbursed: toMillions(idaDisb),
      Undisbursed: toMillions(idaUndis),
      Pipeline: toMillions(idaPipe),
    },
  };
  const total = {
    Disbursed: Number((table.IBRD.Disbursed + table.IDA.Disbursed).toFixed(1)),
    Undisbursed: Number(
      (table.IBRD.Undisbursed + table.IDA.Undisbursed).toFixed(1)
    ),
    Pipeline: Number((table.IBRD.Pipeline + table.IDA.Pipeline).toFixed(1)),
  };
  return { table, Total: total };
}

export function buildTextSummary(
  portfolioRows: PortfolioRow[],
  metadata: Metadata
) {
  const activeClosed = portfolioRows.filter((r) =>
    ['Active', 'Closed'].includes((r['Status'] ?? '').toString().trim())
  );
  const numActiveClosed = activeClosed.length;
  const numUniqueCountries = new Set(
    activeClosed
      .map((r) => (r['Country'] ?? '').toString().trim())
      .filter(Boolean)
  ).size;
  const numClosed = portfolioRows.filter(
    (r) => (r['Status'] ?? '').toString().trim() === 'Closed'
  ).length;
  const numPipeline = portfolioRows.filter(
    (r) => (r['Status'] ?? '').toString().trim() === 'Pipeline'
  ).length;

  const disbTot = activeClosed.reduce(
    (acc, r) => acc + toNumberLoose(r['Disbursements - Cat DDO Cum.']),
    0
  );
  const disbTotBillion = Number((disbTot / 1e9).toFixed(1));

  const ibrdVal =
    activeClosed.reduce(
      (acc, r) => acc + toNumberLoose(r['Disbursements - Cat DDO Cum. (IBRD)']),
      0
    ) / 1e6;
  const idaVal =
    activeClosed.reduce(
      (acc, r) => acc + toNumberLoose(r['Disbursements - Cat DDO Cum. (IDA)']),
      0
    ) / 1e6;
  const totalVal = ibrdVal + idaVal;
  const ibrdShare =
    totalVal > 0 ? Number(((ibrdVal / totalVal) * 100).toFixed(1)) : 0;
  const idaShare =
    totalVal > 0 ? Number(((idaVal / totalVal) * 100).toFixed(1)) : 0;

  const activeOnly = portfolioRows.filter(
    (r) => (r['Status'] ?? '').toString().trim() === 'Active'
  );
  const undisbBillion = Number(
    (
      activeOnly.reduce(
        (acc, r) => acc + toNumberLoose(r['CAT DDO Undisbursed']),
        0
      ) / 1e9
    ).toFixed(1)
  );

  // Undisbursed by region (active only)
  const byRegion = new Map<string, number>();
  for (const r of activeOnly) {
    const region = (r['Region'] ?? '').toString().trim();
    const val = toNumberLoose(r['CAT DDO Undisbursed']);
    byRegion.set(region, (byRegion.get(region) ?? 0) + val);
  }
  const sorted = Array.from(byRegion.entries())
    .map(([region, val]) => [region, val / 1e6] as [string, number])
    .sort((a, b) => b[1] - a[1]);
  const [topRegion, topVal] = sorted[0] ?? ['', 0];
  const [secondRegion, secondVal] = sorted[1] ?? ['', 0];
  const totalUndisM = sorted.reduce((acc, [, v]) => acc + v, 0) || 1;
  const topShare = Number(((topVal / totalUndisM) * 100).toFixed(1));
  const secondShare = Number(((secondVal / totalUndisM) * 100).toFixed(1));

  // Pipeline counts and amounts by source
  const pipelineIDA = portfolioRows.filter(
    (r) =>
      (r['Status'] ?? '').toString().trim() === 'Pipeline' &&
      (r['Source'] ?? '').toString().trim() === 'IDA'
  );
  const pipelineIBRD = portfolioRows.filter(
    (r) =>
      (r['Status'] ?? '').toString().trim() === 'Pipeline' &&
      (r['Source'] ?? '').toString().trim() === 'IBRD'
  );
  const pipelineIDAmt =
    pipelineIDA.reduce(
      (acc, r) => acc + toNumberLoose(r['Commitment (Cat DDO only)']),
      0
    ) / 1e6;
  const pipelineIBRDAmt =
    pipelineIBRD.reduce(
      (acc, r) => acc + toNumberLoose(r['Commitment (Cat DDO only)']),
      0
    ) / 1e6;

  // Mixed operations commitment summary
  const mixedActiveClosed = activeClosed.filter(
    (r) => (r['Standalone/Mixed'] ?? '').toString().trim() === 'Mixed'
  );
  const mixedAllCommit =
    mixedActiveClosed.reduce(
      (acc, r) => acc + toNumberLoose(r['Commitment (All = DPO + Cat DDO)']),
      0
    ) / 1e6;
  const mixedCatCommit =
    mixedActiveClosed.reduce(
      (acc, r) => acc + toNumberLoose(r['Commitment (Cat DDO only)']),
      0
    ) / 1e6;

  const month = metadata.Update_Month ?? '';
  const year = metadata.Update_Year ?? '';

  const phrase1 = `As of ${month}, ${year}, ${numActiveClosed} Cat DDOs have been approved in ${numUniqueCountries} countries, with ${numClosed} of these operations having already been closed. There are additional ${numPipeline} Cat DDOs currently in the pipeline.`;
  const phrase2 = `Cat DDOs have disbursed a total of US$ ${disbTotBillion} billion`;
  const phrase3 =
    ibrdVal > idaVal
      ? `IBRD countries account for larger disbursed amounts (${ibrdShare}% against ${idaShare}% for IDA countries). There has been a notable increase in the use of Cat DDOs to support IDA countries since 2018.`
      : `IDA countries account for larger disbursed amounts (${idaShare}% against ${ibrdShare}% for IBRD countries). There has been a notable increase in the use of Cat DDOs to support IDA countries since 2018.`;
  const phrase4 = `There is an undisbursed balance of US$ ${undisbBillion} billion available for responding to catastrophes including public health-related emergencies.`;
  const phrase5 = `Of the undisbursed amount, US$ ${topVal.toFixed(1)} million (${topShare}%) is allocated to ${topRegion} and US$ ${secondVal.toFixed(1)} million (${secondShare}%) to ${secondRegion}.`;
  const phrase6 = `${pipelineIDA.length} Cat DDOs totaling US$ ${pipelineIDAmt.toFixed(1)} million are under preparation in IDA countries, compared to ${pipelineIBRD.length} operations amounting to US$ ${pipelineIBRDAmt.toFixed(1)} million for IBRD countries.`;
  const phrase7 = `Of the US$ ${mixedAllCommit.toFixed(1)} million committed to DPOs that combine upfront budget support with the Cat DDO instrument, US$ ${mixedCatCommit.toFixed(1)} million has been specifically allocated to the Cat DDO.`;

  return {
    phrase1,
    phrase2,
    phrase3,
    phrase4,
    phrase5,
    phrase6,
    phrase7,
    numbers: {
      numActiveClosed,
      numUniqueCountries,
      numClosed,
      numPipeline,
      disbTotBillion,
      ibrdShare,
      idaShare,
      undisbBillion,
      topRegion,
      topVal: Number(topVal.toFixed(1)),
      topShare,
      secondRegion,
      secondVal: Number(secondVal.toFixed(1)),
      secondShare,
      pipelineIDA: pipelineIDA.length,
      pipelineIDAmt: Number(pipelineIDAmt.toFixed(1)),
      pipelineIBRD: pipelineIBRD.length,
      pipelineIBRDAmt: Number(pipelineIBRDAmt.toFixed(1)),
      mixedAllCommit: Number(mixedAllCommit.toFixed(1)),
      mixedCatCommit: Number(mixedCatCommit.toFixed(1)),
    },
  };
}

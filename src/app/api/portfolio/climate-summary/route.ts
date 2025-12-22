import { NextResponse } from 'next/server';
import { loadPortfolio } from '@/lib/portfolio';
import { getClimateCsvPath, readCsvAsObjects, toNumberLoose } from '@/lib/csv';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Load full portfolio (not affected by filters)
    const portfolio = loadPortfolio();

    // Build a map of project ID to Standalone/Mixed type
    const projectTypeMap = new Map<string, string>();
    for (const row of portfolio) {
      const pid = (row['P#'] ?? '').toString().trim();
      const opType = (row['Standalone/Mixed'] ?? '').toString().trim();
      const status = (row['Status'] ?? '').toString().trim();
      if (pid && ['Active', 'Closed'].includes(status)) {
        projectTypeMap.set(pid, opType);
      }
    }

    // Load climate co-benefits data
    const climateRows = readCsvAsObjects(getClimateCsvPath());

    const allCcbs: number[] = [];
    const standaloneCcbs: number[] = [];
    const mixedCcbs: number[] = [];

    for (const row of climateRows) {
      const pid = (row['Project ID'] ?? '').toString().trim();
      const ccbRaw = row['Total CCB %'];
      const ccb = toNumberLoose(ccbRaw);

      // Only include projects that are in the filtered portfolio (Active/Closed)
      if (projectTypeMap.has(pid)) {
        allCcbs.push(ccb);
        const opType = projectTypeMap.get(pid);
        if (opType === 'Standalone') {
          standaloneCcbs.push(ccb);
        } else if (opType === 'Mixed') {
          mixedCcbs.push(ccb);
        }
      }
    }

    // Calculate averages
    const avgAll =
      allCcbs.length > 0
        ? allCcbs.reduce((a, b) => a + b, 0) / allCcbs.length
        : 0;
    const avgStandalone =
      standaloneCcbs.length > 0
        ? standaloneCcbs.reduce((a, b) => a + b, 0) / standaloneCcbs.length
        : 0;
    const avgMixed =
      mixedCcbs.length > 0
        ? mixedCcbs.reduce((a, b) => a + b, 0) / mixedCcbs.length
        : 0;

    return NextResponse.json({
      avgAll: Math.round(avgAll),
      avgStandalone: Math.round(avgStandalone),
      avgMixed: Math.round(avgMixed),
      countAll: allCcbs.length,
      countStandalone: standaloneCcbs.length,
      countMixed: mixedCcbs.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

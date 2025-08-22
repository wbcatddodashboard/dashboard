import { NextResponse } from 'next/server';
import { loadPriorActions, loadPortfolioFiltered } from '@/lib/portfolio';
import { parseFiltersFromRequest } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filters = parseFiltersFromRequest(request);

    // Filter the portfolio first to get the relevant Project IDs
    const filteredPortfolio = loadPortfolioFiltered(filters);
    const filteredProjectIds = new Set(
      filteredPortfolio
        .map((row) => (row['P#'] ?? '').toString().trim())
        .filter(Boolean)
    );

    // Load all prior actions and filter by Project IDs
    const allPriorActions = loadPriorActions();
    const priorActions = allPriorActions.filter((row) =>
      filteredProjectIds.has((row['P#'] ?? '').toString().trim())
    );

    // Group by PA Typology Description for chart data
    const typologyCounts = new Map<string, number>();

    for (const row of priorActions) {
      const typology = row['PA Typology Description'] || 'Unknown';
      typologyCounts.set(typology, (typologyCounts.get(typology) || 0) + 1);
    }

    // Convert to chart data format
    const chartData = Array.from(typologyCounts.entries()).map(
      ([typology, count]) => ({
        id: typology,
        label: typology,
        values: {
          'Prior Actions': count,
        },
      })
    );

    // Sort by count descending
    chartData.sort(
      (a, b) => b.values['Prior Actions'] - a.values['Prior Actions']
    );

    // Define series for the chart
    const series = [
      {
        key: 'Prior Actions',
        label: 'Prior Actions',
        color: '#295e84',
      },
    ];

    return NextResponse.json({
      chartData,
      series,
      tableData: priorActions,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

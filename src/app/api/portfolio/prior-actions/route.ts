import { NextResponse } from 'next/server';
import { loadPriorActions } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const priorActions = loadPriorActions();

    // Group by PA Typology Description for chart data
    const typologyCounts = new Map<string, number>();

    for (const row of priorActions) {
      const typology = row['PA Typology Description'] ?? 'Unknown';
      typologyCounts.set(typology, (typologyCounts.get(typology) ?? 0) + 1);
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

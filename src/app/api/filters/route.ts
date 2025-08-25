import { NextResponse } from 'next/server';
import { loadPortfolio } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

type FilterData = {
  regions: string[];
  countries: string[];
  statuses: string[];
};

export async function GET() {
  try {
    const rows = loadPortfolio();

    const regions = Array.from(
      new Set(
        rows.map((r) => (r['Region'] ?? '').toString().trim()).filter(Boolean)
      )
    ).sort();

    const countries = Array.from(
      new Set(
        rows.map((r) => (r['Country'] ?? '').toString().trim()).filter(Boolean)
      )
    ).sort();

    const statuses = Array.from(
      new Set(
        rows.map((r) => (r['Status'] ?? '').toString().trim()).filter(Boolean)
      )
    ).sort();

    const filterData: FilterData = {
      regions,
      countries,
      statuses,
    };

    return NextResponse.json({ data: filterData });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

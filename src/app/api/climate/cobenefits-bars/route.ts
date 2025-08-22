import { NextResponse } from 'next/server';
import { cobenefitsBars } from '@/lib/climate';
import { loadPortfolioFiltered, type FilterState } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: FilterState = {
      statuses: searchParams.get('statuses')?.split(',').filter(Boolean) || [],
      regions: searchParams.get('regions')?.split(',').filter(Boolean) || [],
      countries:
        searchParams.get('countries')?.split(',').filter(Boolean) || [],
    };

    const filteredPortfolio = loadPortfolioFiltered(filters);
    const filteredProjectIds = new Set(
      filteredPortfolio
        .map((row) => (row['P#'] ?? '').toString().trim())
        .filter(Boolean)
    );

    const result = cobenefitsBars(filteredProjectIds);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

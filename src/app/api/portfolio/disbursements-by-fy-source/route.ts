import { NextResponse } from 'next/server';
import {
  getFyColumns,
  loadMetadata,
  loadPortfolioFiltered,
  sumDisbursementsByFyAndSource,
  type FilterState,
} from '@/lib/portfolio';

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

    const portfolio = loadPortfolioFiltered(filters);
    const metadata = loadMetadata();
    const { fyColumns, fyShortLabels } = getFyColumns(portfolio, metadata);
    const { ibrd, ida } = sumDisbursementsByFyAndSource(portfolio, fyColumns);
    const total = ibrd.map((v, i) => v + ida[i]);
    return NextResponse.json({
      fiscalYears: fyColumns,
      labels: fyShortLabels,
      ibrd,
      ida,
      total,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

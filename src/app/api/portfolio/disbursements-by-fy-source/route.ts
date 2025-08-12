import { NextResponse } from 'next/server';
import {
  getFyColumns,
  loadMetadata,
  loadPortfolio,
  sumDisbursementsByFyAndSource,
} from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = loadPortfolio();
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

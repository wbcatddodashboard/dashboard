import { NextResponse } from 'next/server';
import { loadPortfolio, sumDisbursementsByRegion } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = loadPortfolio();
    const regions = sumDisbursementsByRegion(portfolio);
    return NextResponse.json({ regions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { loadPortfolio, sumDisbursementsByCountry } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = loadPortfolio();
    const countries = sumDisbursementsByCountry(portfolio);
    return NextResponse.json({ countries });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

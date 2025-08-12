import { NextResponse } from 'next/server';
import { crosstabRegionStatus, loadPortfolio } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = loadPortfolio();
    const { regions, statuses, matrix } = crosstabRegionStatus(portfolio);
    return NextResponse.json({ regions, statuses, matrix });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import {
  crosstabFiscalYearOperationType,
  loadPortfolio,
} from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = loadPortfolio();
    const { types, years, matrix } = crosstabFiscalYearOperationType(portfolio);
    return NextResponse.json({ types, years, matrix });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

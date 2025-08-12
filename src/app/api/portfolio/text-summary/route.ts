import { NextResponse } from 'next/server';
import { buildTextSummary, loadMetadata, loadPortfolio } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = loadPortfolio();
    const metadata = loadMetadata();
    const result = buildTextSummary(portfolio, metadata);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

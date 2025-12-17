import { NextResponse } from 'next/server';
import { loadPortfolioFiltered } from '@/lib/portfolio';
import { parseFiltersFromRequest } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filters = parseFiltersFromRequest(request);

    // Get filtered rows (respecting sidebar selection) but preserve ALL columns
    const rows = loadPortfolioFiltered(filters);

    const list = rows.map((r, index) => {
      const pid = (r['P#'] ?? '').toString().trim();
      const safeId = pid || `row-${index + 1}`;
      // Spread all properties (...r) to ensure every CSV column is returned
      return {
        ...r,
        id: safeId,
      };
    });

    return NextResponse.json({ data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { loadPriorActions, loadPortfolioFiltered } from '@/lib/portfolio';
import { parseFiltersFromRequest } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filters = parseFiltersFromRequest(request);

    const filteredPortfolio = loadPortfolioFiltered(filters);
    const filteredProjectIds = new Set(
      filteredPortfolio
        .map((row) => (row['P#'] ?? '').toString().trim())
        .filter(Boolean)
    );

    // Load all prior actions and filter by Project IDs
    const allPriorActions = loadPriorActions();
    const priorActions = allPriorActions
      .filter((row) =>
        filteredProjectIds.has((row['P#'] ?? '').toString().trim())
      )
      .filter((row) => {
        const drmPillar = (row['DRM Pillar'] ?? '').toString().trim();
        return drmPillar !== '' && !drmPillar.toLowerCase().includes('not drm');
      })
      .filter((row) => {
        if (!filters.pillars.length) return true;
        const rowPillar = (row['DRM Pillar'] ?? '').toString().trim();
        return filters.pillars.includes(rowPillar);
      });

    const pillarColorMap: Record<string, string> = {
      'Legal and Institutional DRM Framework': '#e4a3a3',
      'DRM policies and institutions': '#e4a3a3',
      'Mainstreaming DRM into national development plans': '#e4a3a3',
      'Risk Identification': '#e4e4a3',
      'Risk Reduction': '#a3e4a3',
      'Territorial and urban planning': '#a3e4a3',
      'Public investment at the central level': '#a3e4a3',
      'Sector-specific risk reduction measures': '#a3e4a3',
      Preparedness: '#a3e4e4',
      'Early Warning Systems': '#a3e4e4',
      'Emergency Preparedness and Response': '#a3e4e4',
      'Adaptive Social Protection': '#a3e4e4',
      'Financial Protection': '#a3a3e4',
      'Fiscal Risk': '#a3a3e4',
      'Disaster Risk Financing strategies and instruments': '#a3a3e4',
      'Resilient Reconstruction': '#e4a3e4',
    };

    const pillarCounts = new Map<string, number>();

    for (const row of priorActions) {
      const pillar = row['DRM Pillar'] ?? 'Unknown';
      pillarCounts.set(pillar, (pillarCounts.get(pillar) ?? 0) + 1);
    }

    const sortedPillars = Array.from(pillarCounts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([pillar]) => pillar);

    const chartData = sortedPillars.map((pillar) => ({
      id: pillar,
      label: pillar,
      values: {
        [pillar]: pillarCounts.get(pillar) || 0,
      },
    }));

    const series = sortedPillars.map((pillar) => ({
      key: pillar,
      label: pillar,
      color: pillarColorMap[pillar] || '#cccccc',
    }));

    return NextResponse.json({
      chartData,
      series,
      tableData: priorActions,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

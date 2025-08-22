import { FilterState } from '@/contexts/FilterContext';

export function buildApiUrl(baseUrl: string, filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.statuses.length) {
    params.append('statuses', filters.statuses.join(','));
  }
  if (filters.regions.length) {
    params.append('regions', filters.regions.join(','));
  }
  if (filters.countries.length) {
    params.append('countries', filters.countries.join(','));
  }

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

export function parseFiltersFromRequest(request: Request): FilterState {
  const { searchParams } = new URL(request.url);

  return {
    statuses: searchParams.get('statuses')?.split(',').filter(Boolean) ?? [],
    regions: searchParams.get('regions')?.split(',').filter(Boolean) ?? [],
    countries: searchParams.get('countries')?.split(',').filter(Boolean) ?? [],
  };
}

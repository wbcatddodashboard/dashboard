import { FilterState } from '@/contexts/FilterContext';

export function buildApiUrl(baseUrl: string, filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.statuses.length > 0) {
    params.append('statuses', filters.statuses.join(','));
  }
  if (filters.regions.length > 0) {
    params.append('regions', filters.regions.join(','));
  }
  if (filters.countries.length > 0) {
    params.append('countries', filters.countries.join(','));
  }

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

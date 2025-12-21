import type { Metadata } from '@/lib/portfolio';

export function formatLastUpdate(
  metadata: Metadata,
  isLoading: boolean
): string {
  if (
    isLoading ||
    !metadata.Update_Day ||
    !metadata.Update_Month ||
    !metadata.Update_Year
  ) {
    return 'Loading...';
  }

  const day = metadata.Update_Day;
  const month = metadata.Update_Month;
  const year = metadata.Update_Year;

  return `${month} ${day}, ${year}`;
}

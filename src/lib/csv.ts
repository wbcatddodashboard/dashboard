import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export function getDataDir(): string {
  return path.join(process.cwd(), 'src', 'data');
}

export type CsvRecord = Record<string, string>;

export function readCsvAsObjects(csvAbsolutePath: string): CsvRecord[] {
  const fileContent = fs.readFileSync(csvAbsolutePath, 'utf8');
  const records = parse(fileContent, {
    columns: (header: string[]) =>
      header.map((h) => (h ?? '').toString().trim()),
    skip_empty_lines: true,
    trim: true,
  });
  return records as CsvRecord[];
}

export function toNumberLoose(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (value == null) return 0;
  const str = String(value).trim();
  if (str === '' || str === '-' || str === '–' || str === '—') return 0;
  const normalized = str.replace(/,/g, '');
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

export function getPortfolioCsvPath(): string {
  return path.join(getDataDir(), 'Cat_DDO_Portfolio.csv');
}

export function getMetadataCsvPath(): string {
  return path.join(getDataDir(), 'Cat_DDO_Metadata.csv');
}

export function getClimateCsvPath(): string {
  return path.join(getDataDir(), 'Climate_cobenefits.csv');
}

export function getPriorActionsCsvPath(): string {
  return path.join(getDataDir(), 'Cat_DDO_Prior_Actions.csv');
}

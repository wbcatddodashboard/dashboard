// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { readCsvAsObjects, toNumberLoose } from './csv';

describe('toNumberLoose', () => {
  it('returns finite numbers unchanged', () => {
    expect(toNumberLoose(42)).toBe(42);
    expect(toNumberLoose(-1.5)).toBe(-1.5);
  });

  it('parses numeric strings, including thousands separators', () => {
    expect(toNumberLoose('1000')).toBe(1000);
    expect(toNumberLoose('1,234,567')).toBe(1234567);
    expect(toNumberLoose('  12.5  ')).toBe(12.5);
  });

  it('treats empty values and dashes as zero', () => {
    for (const v of [undefined, null, '', '   ', '-', '–', '—']) {
      expect(toNumberLoose(v)).toBe(0);
    }
  });

  it('treats unparseable values as zero', () => {
    expect(toNumberLoose('n/a')).toBe(0);
    expect(toNumberLoose(Number.NaN)).toBe(0);
    expect(toNumberLoose(Number.POSITIVE_INFINITY)).toBe(0);
  });
});

describe('readCsvAsObjects', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'csv-test-'));
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }));

  it('reads latin1 files, trims headers and values, and skips blank lines', () => {
    const file = path.join(dir, 'sample.csv');
    const content =
      ' P# , Country ,Amount\n' +
      'P1, Perú ,"1,000"\n' +
      '\n' +
      "P2,Côte d'Ivoire,-\n";
    // Excel saves these files as Windows-1252/latin1, not UTF-8.
    fs.writeFileSync(file, Buffer.from(content, 'latin1'));

    const rows = readCsvAsObjects(file);

    expect(rows).toEqual([
      { 'P#': 'P1', Country: 'Perú', Amount: '1,000' },
      { 'P#': 'P2', Country: "Côte d'Ivoire", Amount: '-' },
    ]);
  });
});

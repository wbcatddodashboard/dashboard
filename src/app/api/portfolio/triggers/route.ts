import { NextResponse } from 'next/server';
import path from 'node:path';
import { getDataDir, readCsvAsObjects } from '@/lib/csv';

export const dynamic = 'force-dynamic';

type TriggerRow = {
  id: string;
  projectId: string;
  country: string;
  projectName: string;
  fiscalYear: string;
  status: string;
  activationForCovid: string;
  financier: string;
  region: string;
  globalPractice: string;
  operationType: string;
  triggerText: string;
  additionalInfo: string;
  healthRelatedEmergencies: string;
  disastersTriggered: string;
  link: string;
};

export async function GET() {
  try {
    const csvPath = path.join(getDataDir(), 'Cat_DDO_Triggers.csv');
    const rows = readCsvAsObjects(csvPath);
    const data: TriggerRow[] = rows.map((r) => ({
      id: (r['P#'] ?? '').toString().trim(),
      projectId: (r['P#'] ?? '').toString().trim(),
      country: (r['Country'] ?? '').toString().trim(),
      projectName: (r['Project Name'] ?? '').toString().trim(),
      fiscalYear: (r['Fiscal Year'] ?? '').toString().trim(),
      status: (r['Status'] ?? '').toString().trim(),
      activationForCovid: (
        r['Activation for COVID'] ??
        r['Activation for COVID '] ??
        ''
      )
        .toString()
        .trim(),
      financier: (r['Project Financier'] ?? '').toString().trim(),
      region: (r['Region'] ?? '').toString().trim(),
      globalPractice: (r['Global Practice'] ?? '').toString().trim(),
      operationType: (r['Standalone/Mixed'] ?? '').toString().trim(),
      triggerText: (r['Trigger from Loan/Financing Agreements'] ?? '')
        .toString()
        .trim(),
      additionalInfo: (
        r['Additional Information from Minutes & Program Document'] ?? ''
      )
        .toString()
        .trim(),
      healthRelatedEmergencies: (
        r['Health Related emergencies mentioned in the Trigger '] ?? ''
      )
        .toString()
        .trim(),
      disastersTriggered: (
        r['Disasters that have triggered the Cat DDO '] ??
        r['Disasters that have triggered the Cat DDO'] ??
        ''
      )
        .toString()
        .trim(),
      link: (r['Link to Financing or Loan Agreement'] ?? '').toString().trim(),
    }));

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

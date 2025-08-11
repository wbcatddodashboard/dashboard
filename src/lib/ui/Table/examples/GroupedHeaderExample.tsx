import Table from '../Table';
import type { TableColumn, TableColumnGroup } from '../Table.d';

interface SalesRow {
  id: string;
  product: string;
  region: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

const data: SalesRow[] = [
  {
    id: '1',
    product: 'Alpha',
    region: 'NA',
    q1: 120,
    q2: 140,
    q3: 160,
    q4: 180,
  },
  { id: '2', product: 'Beta', region: 'EU', q1: 90, q2: 110, q3: 130, q4: 150 },
  {
    id: '3',
    product: 'Gamma',
    region: 'APAC',
    q1: 200,
    q2: 190,
    q3: 210,
    q4: 230,
  },
];

const columns: TableColumn<SalesRow>[] = [
  {
    id: 'product',
    key: 'product',
    label: 'Product',
    width: 160,
    fixed: 'left',
  },
  { id: 'region', key: 'region', label: 'Region', width: 120 },
  {
    id: 'q1',
    key: 'q1',
    label: 'Q1',
    align: 'right',
    width: 96,
    group: 'quarters',
  },
  {
    id: 'q2',
    key: 'q2',
    label: 'Q2',
    align: 'right',
    width: 96,
    group: 'quarters',
  },
  {
    id: 'q3',
    key: 'q3',
    label: 'Q3',
    align: 'right',
    width: 96,
    group: 'quarters',
  },
  {
    id: 'q4',
    key: 'q4',
    label: 'Q4',
    align: 'right',
    width: 96,
    group: 'quarters',
  },
];

const columnGroups: TableColumnGroup[] = [
  {
    id: 'quarters',
    label: 'Quarterly Sales',
    columns: ['q1', 'q2', 'q3', 'q4'],
  },
];

export default function GroupedHeaderExample() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Grouped Header Example</h2>
      <Table
        data={data}
        columns={columns}
        columnGroups={columnGroups}
        scroll={{ x: 800 }}
        bordered
      />
    </div>
  );
}

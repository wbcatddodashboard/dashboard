import Table from '../Table';
import { TableColumn } from '../Table.d';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  subcategory: string;
  merchant: string;
  amount: number;
  balance: number;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  notes?: string;
}

const sampleData: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Online Purchase - Electronics Store',
    category: 'Shopping',
    subcategory: 'Electronics',
    merchant: 'TechMart Inc.',
    amount: -299.99,
    balance: 2450.51,
    status: 'completed',
    reference: 'TXN-001-2024',
    notes: 'Laptop purchase',
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Salary Deposit',
    category: 'Income',
    subcategory: 'Salary',
    merchant: 'ACME Corp',
    amount: 3500.0,
    balance: 2750.5,
    status: 'completed',
    reference: 'TXN-002-2024',
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Coffee Shop',
    category: 'Food & Dining',
    subcategory: 'Coffee',
    merchant: 'Daily Grind',
    amount: -4.5,
    balance: -749.5,
    status: 'completed',
    reference: 'TXN-003-2024',
  },
  {
    id: '4',
    date: '2024-01-12',
    description: 'Gas Station',
    category: 'Transportation',
    subcategory: 'Fuel',
    merchant: 'Shell Station',
    amount: -45.0,
    balance: -745.0,
    status: 'pending',
    reference: 'TXN-004-2024',
  },
  {
    id: '5',
    date: '2024-01-11',
    description: 'Grocery Store',
    category: 'Food & Dining',
    subcategory: 'Groceries',
    merchant: 'SuperMarket Plus',
    amount: -87.32,
    balance: -700.0,
    status: 'completed',
    reference: 'TXN-005-2024',
    notes: 'Weekly groceries',
  },
];

const columns: TableColumn<Transaction>[] = [
  {
    id: 'date',
    key: 'date',
    label: 'Date',
    sortable: true,
    width: 120,
    fixed: 'left',
  },
  {
    id: 'description',
    key: 'description',
    label: 'Description',
    width: 250,
    fixed: 'left',
  },
  {
    id: 'category',
    key: 'category',
    label: 'Category',
    sortable: true,
    width: 150,
  },
  {
    id: 'subcategory',
    key: 'subcategory',
    label: 'Subcategory',
    sortable: true,
    width: 150,
  },
  {
    id: 'merchant',
    key: 'merchant',
    label: 'Merchant',
    sortable: true,
    width: 180,
  },
  {
    id: 'reference',
    key: 'reference',
    label: 'Reference',
    width: 150,
  },
  {
    id: 'notes',
    key: 'notes',
    label: 'Notes',
    width: 200,
    render: (value) =>
      typeof value === 'string' && value.length ? value : '-',
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    width: 120,
    render: (value) => {
      const status = typeof value === 'string' ? value : '';
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'completed'
              ? 'bg-green-100 text-green-800'
              : status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: 'amount',
    key: 'amount',
    label: 'Amount',
    sortable: true,
    width: 120,
    align: 'right',
    fixed: 'right',
    render: (value) => {
      const numeric = typeof value === 'number' ? value : 0;
      return (
        <span
          className={
            numeric >= 0
              ? 'text-green-600 font-medium'
              : 'text-red-600 font-medium'
          }
        >
          {`${numeric >= 0 ? '+' : ''}$${Math.abs(numeric).toFixed(2)}`}
        </span>
      );
    },
  },
  {
    id: 'balance',
    key: 'balance',
    label: 'Balance',
    sortable: true,
    width: 120,
    align: 'right',
    fixed: 'right',
    render: (value) => (
      <span
        className={
          (typeof value === 'number' ? value : 0) >= 0
            ? 'text-green-600 font-semibold'
            : 'text-red-600 font-semibold'
        }
      >
        ${typeof value === 'number' ? value.toFixed(2) : '0.00'}
      </span>
    ),
  },
];

export default function FixedColumnsExample() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fixed Columns Table Example</h2>

      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This table demonstrates fixed columns. The Date
          and Description columns are fixed to the left, while Amount and
          Balance are fixed to the right. Try scrolling horizontally to see the
          effect.
        </p>
      </div>

      <Table
        data={sampleData}
        columns={columns}
        scroll={{ x: 1400 }}
        pagination={{
          page: 1,
          pageSize: 10,
          total: sampleData.length,
          showSizeChanger: true,
          showTotal: true,
        }}
        bordered
        hoverable
        size="small"
      />
    </div>
  );
}

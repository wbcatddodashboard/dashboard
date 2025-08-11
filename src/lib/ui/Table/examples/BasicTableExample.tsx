import Table from '../Table';
import { TableColumn } from '../Table.d';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const sampleData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    createdAt: new Date('2023-02-20'),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'inactive',
    createdAt: new Date('2023-03-10'),
  },
];

const columns: TableColumn<User>[] = [
  {
    id: 'name',
    key: 'name',
    label: 'Name',
    sortable: true,
    width: 200,
  },
  {
    id: 'email',
    key: 'email',
    label: 'Email',
    sortable: true,
    width: 250,
  },
  {
    id: 'role',
    key: 'role',
    label: 'Role',
    sortable: true,
    width: 120,
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    width: 100,
    render: (value) => {
      const status = typeof value === 'string' ? value : '';
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: 'createdAt',
    key: 'createdAt',
    label: 'Created At',
    sortable: true,
    width: 150,
    render: (value) =>
      value instanceof Date ? value.toLocaleDateString() : '',
  },
];

export default function BasicTableExample() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Basic Table Example</h2>

      <Table
        data={sampleData}
        columns={columns}
        bordered
        hoverable
        striped
        pagination={{
          page: 1,
          pageSize: 10,
          total: sampleData.length,
          showSizeChanger: true,
          showTotal: true,
        }}
      />
    </div>
  );
}

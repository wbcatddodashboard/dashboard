import Table from '../Table';
import { TableColumn } from '../Table.d';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
  },
];

const columns: TableColumn<User>[] = [
  { id: 'name', key: 'name', label: 'Name', sortable: true, width: 200 },
  { id: 'email', key: 'email', label: 'Email', sortable: true, width: 250 },
  { id: 'role', key: 'role', label: 'Role', sortable: true, width: 140 },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    width: 120,
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
];

export default function NoPaginationTableExample() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Table Without Pagination</h2>

      <Table data={sampleData} columns={columns} bordered hoverable striped />
    </div>
  );
}

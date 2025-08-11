import { useState, useMemo } from 'react';
import Table from '../Table';
import { TableColumn } from '../Table.d';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: Date;
  status: 'active' | 'inactive' | 'on-leave';
  manager?: string;
  skills: string[];
  performance: number;
}

const sampleData: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 95000,
    hireDate: new Date('2020-03-15'),
    status: 'active',
    manager: 'Jane Smith',
    skills: ['React', 'TypeScript', 'Node.js'],
    performance: 4.5,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    department: 'Engineering',
    position: 'Engineering Manager',
    salary: 120000,
    hireDate: new Date('2019-01-10'),
    status: 'active',
    skills: ['Leadership', 'Python', 'AWS'],
    performance: 4.8,
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@company.com',
    department: 'Marketing',
    position: 'Marketing Specialist',
    salary: 65000,
    hireDate: new Date('2021-06-20'),
    status: 'active',
    manager: 'Sarah Wilson',
    skills: ['SEO', 'Content Marketing', 'Analytics'],
    performance: 4.2,
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Marketing',
    position: 'Marketing Director',
    salary: 85000,
    hireDate: new Date('2018-11-05'),
    status: 'on-leave',
    skills: ['Strategy', 'Team Management', 'Digital Marketing'],
    performance: 4.6,
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    salary: 55000,
    hireDate: new Date('2022-02-14'),
    status: 'active',
    manager: 'Lisa Davis',
    skills: ['CRM', 'Negotiation', 'Lead Generation'],
    performance: 3.8,
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    salary: 75000,
    hireDate: new Date('2019-09-12'),
    status: 'active',
    skills: ['Team Leadership', 'Sales Strategy', 'Customer Relations'],
    performance: 4.4,
  },
];

const columns: TableColumn<Employee>[] = [
  {
    id: 'name',
    key: 'firstName',
    label: 'Name',
    sortable: true,
    width: 180,
    fixed: 'left',
    render: (_, row: Employee) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.firstName} {row.lastName}
        </span>
        <span className="text-xs text-gray-500">{row.email}</span>
      </div>
    ),
  },
  {
    id: 'department',
    key: 'department',
    label: 'Department',
    sortable: true,
    width: 120,
  },
  {
    id: 'position',
    key: 'position',
    label: 'Position',
    sortable: true,
    width: 160,
  },
  {
    id: 'manager',
    key: 'manager',
    label: 'Manager',
    width: 140,
    render: (value) => (typeof value === 'string' ? value : 'N/A'),
  },
  {
    id: 'salary',
    key: 'salary',
    label: 'Salary',
    sortable: true,
    width: 120,
    align: 'right',
    render: (value) =>
      `$${(typeof value === 'number' ? value : 0).toLocaleString()}`,
  },
  {
    id: 'hireDate',
    key: 'hireDate',
    label: 'Hire Date',
    sortable: true,
    width: 120,
    render: (value) =>
      value instanceof Date ? value.toLocaleDateString() : '',
  },
  {
    id: 'skills',
    key: 'skills',
    label: 'Skills',
    width: 200,
    render: (value) =>
      Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{value.length - 2}
            </span>
          )}
        </div>
      ) : null,
  },
  {
    id: 'performance',
    key: 'performance',
    label: 'Performance',
    sortable: true,
    width: 120,
    align: 'center',
    render: (value) => {
      const numeric = typeof value === 'number' ? value : 0;
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm font-medium">{numeric.toFixed(1)}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${star <= numeric ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    width: 100,
    fixed: 'right',
    render: (value) => {
      const status = typeof value === 'string' ? value : '';
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : status === 'on-leave'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {status.replace('-', ' ')}
        </span>
      );
    },
  },
];

export default function AdvancedTableExample() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
  const [currentPage] = useState(1);
  const [pageSize] = useState(5);
  // Sorting is configured via the Table component props

  const filteredData = useMemo(() => {
    return sampleData.filter((employee) => employee.status === 'active');
  }, []);

  const handleSelectionChange = (keys: string[], rows: Employee[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
  };

  // Pagination is handled via Table props; keep state locally for display if needed

  const totalSalary = selectedRows.reduce(
    (sum, employee) => sum + employee.salary,
    0
  );
  const avgPerformance = selectedRows.length
    ? selectedRows.reduce((sum, employee) => sum + employee.performance, 0) /
      selectedRows.length
    : 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Advanced Table Example</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900">Selected Employees</h3>
          <p className="text-2xl font-bold text-blue-700">
            {selectedRows.length}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900">Total Salary</h3>
          <p className="text-2xl font-bold text-green-700">
            ${totalSalary.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-900">Avg Performance</h3>
          <p className="text-2xl font-bold text-purple-700">
            {avgPerformance ? avgPerformance.toFixed(1) : '0.0'}
          </p>
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm font-medium text-gray-700">
            Quick Actions:
          </span>
          <button
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!selectedRows.length}
            onClick={() => alert(`Promoting ${selectedRows.length} employees`)}
          >
            Promote Selected
          </button>
          <button
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
            disabled={!selectedRows.length}
            onClick={() =>
              alert(
                `Sending performance review to ${selectedRows.length} employees`
              )
            }
          >
            Send Review
          </button>
          <button
            className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
            onClick={() => handleSelectionChange([], [])}
          >
            Clear Selection
          </button>
        </div>

        {selectedRows.length && (
          <div className="text-sm text-gray-600">
            <strong>Selected:</strong>{' '}
            {selectedRows
              .map((emp) => `${emp.firstName} ${emp.lastName}`)
              .join(', ')}
          </div>
        )}
      </div>

      <Table
        data={filteredData}
        columns={columns}
        selection={{
          type: 'multiple',
          selectedRowKeys,
          onSelectionChange: handleSelectionChange,
          getRowKey: (row) => row.id,
        }}
        pagination={{
          page: currentPage,
          pageSize,
          total: filteredData.length,
          showSizeChanger: true,
          showQuickJumper: false,
          showTotal: true,
        }}
        sorting={{
          multiple: true,
          defaultSort: [{ key: 'performance', direction: 'desc' }],
        }}
        scroll={{ x: 1200, y: 400 }}
        bordered
        hoverable
        size="small"
        onRow={(row) => ({
          onDoubleClick: () =>
            alert(`Viewing details for ${row.firstName} ${row.lastName}`),
          className: 'cursor-pointer',
        })}
      />

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Features demonstrated:</strong>
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>
            Multi-column sorting (hold Shift while clicking column headers)
          </li>
          <li>Fixed columns (Name on left, Status on right)</li>
          <li>Custom cell rendering with complex components</li>
          <li>Row selection with business logic</li>
          <li>Pagination with size options</li>
          <li>Horizontal and vertical scrolling</li>
          <li>Row double-click events</li>
          <li>Real-time statistics based on selection</li>
        </ul>
      </div>
    </div>
  );
}

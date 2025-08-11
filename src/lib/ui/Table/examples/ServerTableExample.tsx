import { useState, useCallback } from 'react';
import { usePagination, useSorting, useSelection, SortConfig } from '../hooks';
import { PaginationInfo } from '../components/PaginationInfo';
import { PaginationControls } from '../components/PaginationControls';
import { PageSizeSelector } from '../components/PageSizeSelector';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

// Simulate server data
const allServerData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Moderator',
    status: 'active',
    lastLogin: '2024-01-13',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-12',
  },
  {
    id: '6',
    name: 'Diana Davis',
    email: 'diana@example.com',
    role: 'Admin',
    status: 'inactive',
    lastLogin: '2024-01-11',
  },
  {
    id: '7',
    name: 'Eve Miller',
    email: 'eve@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16',
  },
  {
    id: '8',
    name: 'Frank Garcia',
    email: 'frank@example.com',
    role: 'Moderator',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: '9',
    name: 'Grace Lee',
    email: 'grace@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-17',
  },
  {
    id: '10',
    name: 'Henry Taylor',
    email: 'henry@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-18',
  },
  {
    id: '11',
    name: 'Ivy Chen',
    email: 'ivy@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-09',
  },
  {
    id: '12',
    name: 'Jack White',
    email: 'jack@example.com',
    role: 'Moderator',
    status: 'active',
    lastLogin: '2024-01-19',
  },
];

// Simulate server API
const fetchServerData = (
  page: number,
  pageSize: number,
  sortConfig: SortConfig[]
) => {
  // Simulate sorting
  const sortedData = [...allServerData];
  if (sortConfig.length > 0) {
    sortedData.sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        const aValue = (a as unknown as Record<string, unknown>)[key];
        const bValue = (b as unknown as Record<string, unknown>)[key];
        const comparison = String(aValue).localeCompare(String(bValue));
        if (comparison !== 0) {
          return direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0;
    });
  }

  // Simulate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = sortedData.slice(startIndex, endIndex);

  return {
    data: pageData,
    totalItems: allServerData.length,
  };
};

export default function ServerTableExample() {
  const [data, setData] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // Server state change handler
  const handleStateChange = useCallback(
    async (
      paginationState?: { page: number; pageSize: number },
      sortState?: SortConfig[]
    ) => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const page = paginationState?.page || 1;
      const pageSize = paginationState?.pageSize || 10;
      const sortConfig = sortState || [];

      const result = fetchServerData(page, pageSize, sortConfig);
      setData(result.data);
      setTotalItems(result.totalItems);
      setLoading(false);
    },
    []
  );

  // Server-side hooks
  const pagination = usePagination({
    totalItems,
    initialPageSize: 10,
    serverSide: true,
    onStateChange: (state) => handleStateChange(state, sorting.sortConfig),
  });

  const sorting = useSorting<User>({
    data, // Server data (already sorted)
    serverSide: true,
    enableMultiSort: false, // Server typically handles single sort
    initialSort: [{ key: 'name', direction: 'asc' }],
    onStateChange: (sortConfig) =>
      handleStateChange(
        { page: pagination.page, pageSize: pagination.pageSize },
        sortConfig
      ),
  });

  const selection = useSelection<User>({
    data,
    enableMultiSelect: true,
    isRowSelectable: (row) => row.status === 'active',
    getRowId: (row) => row.id,
  });

  // Load initial data
  useState(() => {
    handleStateChange();
  });

  if (loading && data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Server Table Example</h2>

      {/* Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => sorting.toggleSort('name')}
            disabled={loading}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Sort by Name{' '}
            {sorting.getSortDirection('name') === 'asc'
              ? '↑'
              : sorting.getSortDirection('name') === 'desc'
                ? '↓'
                : ''}
          </button>
          <button
            onClick={() => sorting.toggleSort('role')}
            disabled={loading}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Sort by Role{' '}
            {sorting.getSortDirection('role') === 'asc'
              ? '↑'
              : sorting.getSortDirection('role') === 'desc'
                ? '↓'
                : ''}
          </button>
          <button
            onClick={sorting.clearSort}
            disabled={loading}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Clear Sort
          </button>
        </div>

        <PageSizeSelector pagination={pagination} options={[5, 10, 20]} />
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded text-center">
          Loading server data...
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border-b text-left">
                <input
                  type="checkbox"
                  checked={selection.isAllSelected}
                  onChange={() => selection.toggleAll()}
                  className="rounded"
                />
              </th>
              <th className="px-4 py-2 border-b text-left font-medium">Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">
                Email
              </th>
              <th className="px-4 py-2 border-b text-left font-medium">Role</th>
              <th className="px-4 py-2 border-b text-left font-medium">
                Status
              </th>
              <th className="px-4 py-2 border-b text-left font-medium">
                Last Login
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={selection.isRowSelected(user)}
                    onChange={() => selection.toggleRow(user.id)}
                    disabled={!selection.isRowSelectable(user)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <PaginationInfo paginationInfo={pagination.paginationInfo} />
        <PaginationControls pagination={pagination} />
      </div>

      {/* Selection Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">
          Selected {selection.selectedCount} of {selection.selectableCount}{' '}
          selectable rows on this page
        </p>
        {selection.selectedRows.length > 0 && (
          <ul className="text-sm text-gray-600">
            {selection.selectedRows.map((user) => (
              <li key={user.id}>
                • {user.name} ({user.role})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Server Info */}
      <div className="mt-4 p-3 bg-green-50 rounded">
        <p className="text-sm text-green-600">
          Server-side mode: Showing {data.length} of {totalItems} total records
        </p>
        <p className="text-sm text-green-600">
          Current sort:{' '}
          {sorting.sortConfig.length > 0
            ? sorting.sortConfig
                .map((s) => `${s.key} (${s.direction})`)
                .join(', ')
            : 'None'}
        </p>
      </div>
    </div>
  );
}

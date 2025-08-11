import { useState } from 'react';
import Table from '../Table';
import { TableColumn } from '../Table.d';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: boolean;
}

const sampleData: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299.99,
    stock: 15,
    available: true,
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 50,
    available: true,
  },
  {
    id: '3',
    name: 'Desk Chair',
    category: 'Furniture',
    price: 199.99,
    stock: 8,
    available: true,
  },
  {
    id: '4',
    name: 'Monitor Stand',
    category: 'Accessories',
    price: 49.99,
    stock: 0,
    available: false,
  },
  {
    id: '5',
    name: 'Keyboard',
    category: 'Electronics',
    price: 79.99,
    stock: 25,
    available: true,
  },
  {
    id: '6',
    name: 'Table Lamp',
    category: 'Furniture',
    price: 39.99,
    stock: 12,
    available: true,
  },
];

const columns: TableColumn<Product>[] = [
  {
    id: 'name',
    key: 'name',
    label: 'Product Name',
    sortable: true,
    width: 200,
  },
  {
    id: 'category',
    key: 'category',
    label: 'Category',
    sortable: true,
    width: 150,
  },
  {
    id: 'price',
    key: 'price',
    label: 'Price',
    sortable: true,
    width: 120,
    align: 'right',
    render: (value) => `$${(typeof value === 'number' ? value : 0).toFixed(2)}`,
  },
  {
    id: 'stock',
    key: 'stock',
    label: 'Stock',
    sortable: true,
    width: 100,
    align: 'center',
    render: (value) => {
      const numeric = typeof value === 'number' ? value : 0;
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            numeric === 0
              ? 'bg-red-100 text-red-800'
              : numeric < 10
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
          }`}
        >
          {numeric}
        </span>
      );
    },
  },
  {
    id: 'available',
    key: 'available',
    label: 'Available',
    width: 100,
    align: 'center',
    render: (value) => (
      <span
        className={`w-2 h-2 rounded-full inline-block ${
          value === true ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
    ),
  },
];

export default function SelectableTableExample() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);

  const handleSelectionChange = (keys: string[], rows: Product[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
  };

  const isRowDisabled = (row: Product) => !row.available;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Selectable Table Example</h2>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Selection Info:</h3>
        <p className="text-sm text-gray-700">
          Selected {selectedRowKeys.length} of{' '}
          {sampleData.filter((row) => !isRowDisabled(row)).length} available
          products
        </p>
        {selectedRows.length && (
          <div className="mt-2">
            <p className="text-sm font-medium">Selected Products:</p>
            <ul className="text-sm text-gray-600 mt-1">
              {selectedRows.map((row) => (
                <li key={row.id}>
                  • {row.name} - ${row.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Table
        data={sampleData}
        columns={columns}
        selection={{
          type: 'multiple',
          selectedRowKeys,
          onSelectionChange: handleSelectionChange,
          getRowKey: (row) => row.id,
          disabled: isRowDisabled,
        }}
        pagination={{
          page: 1,
          pageSize: 5,
          total: sampleData.length,
          showSizeChanger: true,
          showTotal: true,
        }}
        bordered
        hoverable
        onRow={(row) => ({
          className: isRowDisabled(row) ? 'opacity-50' : '',
        })}
      />

      <div className="mt-4 flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={!selectedRows.length}
          onClick={() =>
            alert(`Processing ${selectedRows.length} selected products`)
          }
        >
          Process Selected ({selectedRows.length})
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          onClick={() => handleSelectionChange([], [])}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
}

import { Pagination } from '@/lib/ui';
import { useMemo } from 'react';

interface Item {
  id: number;
  title: string;
  category: string;
}

const allItems: Item[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  title: `Item #${i + 1}`,
  category: ['A', 'B', 'C'][i % 3],
}));

export default function WithStandalonePaginationExample() {
  const pagination = Pagination.usePagination({
    totalItems: allItems.length,
    initialPageSize: 5,
  });

  const pageItems = useMemo(
    () => pagination.getPageData(allItems),
    [pagination]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Standalone Pagination (No Table)
      </h2>

      <ul className="divide-y rounded border">
        {pageItems.map((item) => (
          <li key={item.id} className="p-3 flex justify-between">
            <span>{item.title}</span>
            <span className="text-xs text-gray-600">
              Category {item.category}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <Pagination.PaginationInfo paginationInfo={pagination.paginationInfo} />
        <div className="flex items-center gap-4">
          <Pagination.PageSizeSelector
            pagination={pagination}
            options={[5, 10, 20]}
          />
          <Pagination.PaginationControls pagination={pagination} />
        </div>
      </div>
    </div>
  );
}

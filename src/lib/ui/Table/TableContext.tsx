import { createContext, useContext } from 'react';
import { TableContextValue, TableProviderProps } from './Table.d';

const TableContext = createContext<TableContextValue<unknown> | null>(null);

export function TableProvider<T = unknown>({
  children,
  value,
}: TableProviderProps<T>) {
  return (
    <TableContext.Provider
      value={value as unknown as TableContextValue<unknown>}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext<T = unknown>(): TableContextValue<T> {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context as TableContextValue<T>;
}

export { TableContext };

import React from 'react';
import { Table } from '@/lib/ui';
import type { TableColumn } from '@/lib/ui/Table/Table.d';
import type { FundingSource } from '../../interfaces';
import { fundingData } from './constants/tableFundingData';
import {
  TableFundingContainer,
  TableFundingNote,
  TableCellText,
} from './styled/TableFundingDDO.styled';

export const TableFundingDDO = () => {
  const fundingColumns: TableColumn<FundingSource>[] = [
    {
      id: 'source',
      key: 'source',
      label: 'Source',
      width: 200,
      render: (value, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'ibrd',
      key: 'ibrd',
      label: 'IBRD',
      width: 48,
      align: 'center',
      render: (value, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'ida',
      key: 'ida',
      label: 'IDA',
      width: 48,
      align: 'center',
      render: (value, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'total',
      key: 'total',
      label: 'Total',
      width: 48,
      align: 'center',
      render: (value, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
  ];

  return (
    <TableFundingContainer>
      <Table
        data={fundingData}
        columns={fundingColumns}
        bordered
        size="small"
        className="w-[357px] [&_thead]:bg-[#f2f3f5] [&_th]:text-[#295e84] [&_th]:font-['Inter:Medium',_sans-serif] [&_th]:font-medium [&_th]:text-[14px] [&_th]:leading-[21px] [&_th]:tracking-[-0.154px] [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-[rgba(0,0,0,0.1)]"
        onRow={(row: FundingSource) => ({
          className: row.isTotal ? 'border-t-2 border-gray-300' : '',
        })}
      />
      <TableFundingNote>
        Note: disbursements are for the overall amount for mixed CATs.
      </TableFundingNote>
    </TableFundingContainer>
  );
};

export default TableFundingDDO;

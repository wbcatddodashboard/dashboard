import React from 'react';
import type { TableColumn } from 'vizonomy';
import type { FundingSource } from '../../interfaces';
import { fundingData } from './constants/tableFundingData';
import {
  TableFundingContainer,
  TableFundingNote,
  TableCellText,
  TableFundingWrapper,
} from './styled/TableFundingDDO.styled';

export const TableFundingDDO = () => {
  const fundingColumns: TableColumn<FundingSource>[] = [
    {
      id: 'source',
      key: 'source',
      label: 'Source',
      width: 200,
      render: (value: string, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'ibrd',
      key: 'ibrd',
      label: 'IBRD',
      width: 48,
      align: 'center',
      render: (value: string, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'ida',
      key: 'ida',
      label: 'IDA',
      width: 48,
      align: 'center',
      render: (value: string, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'total',
      key: 'total',
      label: 'Total',
      width: 48,
      align: 'center',
      render: (value: string, row: FundingSource) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
  ];

  return (
    <TableFundingContainer>
      <TableFundingWrapper data={fundingData} columns={fundingColumns} />
      <TableFundingNote>
        Note: disbursements are for the overall amount for mixed CATs.
      </TableFundingNote>
    </TableFundingContainer>
  );
};

export default TableFundingDDO;

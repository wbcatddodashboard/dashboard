import React from 'react';
import type { TableColumn } from 'vizonomy';
import type { DisbursementRegion } from '../../interfaces';
import {
  TableDisbursementRegionContainer,
  TableDisbursementRegionWrapper_Container,
  TableDisbursementRegionTitle,
  TableCellText,
  TableDisbursementRegionWrapper,
} from './styled/TableDisbursementRegion.styled';
import { useTableDisbursementRegion } from './useTableDisbursementRegion';

export const TableDisbursementRegion = () => {
  const { rows } = useTableDisbursementRegion();

  const columns: TableColumn<DisbursementRegion>[] = [
    {
      id: 'region',
      key: 'region',
      label: 'Region',
      width: '33.33%',
      render: (value: string, row: DisbursementRegion) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'netCommitmentAmount',
      key: 'netCommitmentAmount',
      label: 'Net Comm. Amt. - Total ($M)',
      width: '33.33%',
      align: 'left',
      render: (value: string, row: DisbursementRegion) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'cumulativeDisbursements',
      key: 'cumulativeDisbursements',
      label: 'Disbursements - Cum. Disb. ($M)',
      width: '33.34%',
      align: 'left',
      render: (value: string, row: DisbursementRegion) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
  ];

  return (
    <TableDisbursementRegionContainer>
      <TableDisbursementRegionTitle>
        Disbursements by Region
      </TableDisbursementRegionTitle>
      <TableDisbursementRegionWrapper_Container>
        <TableDisbursementRegionWrapper
          data={rows}
          columns={columns}
          rowKey="id"
        />
      </TableDisbursementRegionWrapper_Container>
    </TableDisbursementRegionContainer>
  );
};

export default TableDisbursementRegion;

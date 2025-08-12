import React from 'react';
import type { TableColumn } from 'vizonomy';
import type { DisbursementCountry } from '../../interfaces';
import {
  TableDisbursementCountryContainer,
  TableDisbursementCountryWrapper_Container,
  TableDisbursementCountryTitle,
  TableCellText,
  TableDisbursementCountryWrapper,
} from './styled/TableDisbursementCountry.styled';
import { useTableDisbursementCountry } from './useTableDisbursementCountry';

export const TableDisbursementCountry = () => {
  const { rows } = useTableDisbursementCountry();

  const columns: TableColumn<DisbursementCountry>[] = [
    {
      id: 'country',
      key: 'country',
      label: 'Country',
      width: '33.33%',
      render: (value: string, row: DisbursementCountry) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'netCommitmentAmount',
      key: 'netCommitmentAmount',
      label: 'Net Comm. Amt. - Total ($M)',
      width: '33.33%',
      align: 'left',
      render: (value: string, row: DisbursementCountry) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'cumulativeDisbursements',
      key: 'cumulativeDisbursements',
      label: 'Disbursements - Cum. Disb. ($M)',
      width: '33.34%',
      align: 'left',
      render: (value: string, row: DisbursementCountry) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
  ];

  return (
    <TableDisbursementCountryContainer>
      <TableDisbursementCountryTitle>
        Disbursements by Country
      </TableDisbursementCountryTitle>
      <TableDisbursementCountryWrapper_Container>
        <TableDisbursementCountryWrapper
          data={rows}
          columns={columns}
          rowKey="id"
        />
      </TableDisbursementCountryWrapper_Container>
    </TableDisbursementCountryContainer>
  );
};

export default TableDisbursementCountry;

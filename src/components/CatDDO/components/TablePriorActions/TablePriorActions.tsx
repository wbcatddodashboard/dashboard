import React from 'react';
import type { TableColumn } from 'vizonomy';
import type { PriorAction } from '../../interfaces';
import {
  TablePriorActionsContainer,
  TablePriorActionsWrapper_Container,
  TableCellText,
  TablePriorActionsWrapper,
  NoDataMessage,
} from './styled/TablePriorActions.styled';
import { useTablePriorActions } from './useTablePriorActions';

export const TablePriorActions = () => {
  const { rows, isLoading, errorMessage } = useTablePriorActions();

  const columns: TableColumn<PriorAction>[] = [
    {
      id: 'projectNumber',
      key: 'projectNumber',
      label: 'P#',
      width: '8%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'country',
      key: 'country',
      label: 'Country',
      width: '12%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'pillar',
      key: 'pillar',
      label: 'Pillar',
      width: '20%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'priorAction',
      key: 'priorAction',
      label: 'Prior Action',
      width: '20%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'resultIndicator',
      key: 'resultIndicator',
      label: 'Result Indicator',
      width: '20%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'drmPolicyArea',
      key: 'drmPolicyArea',
      label: 'DRM Policy Area',
      width: '15%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
    {
      id: 'typeOfLegalEvidence',
      key: 'typeOfLegalEvidence',
      label: 'Type of legal evidence',
      width: '15%',
      render: (value: string, row: PriorAction) => (
        <TableCellText isTotal={row.isTotal}>{value}</TableCellText>
      ),
    },
  ];

  if (isLoading) {
    return (
      <TablePriorActionsContainer>
        <TablePriorActionsWrapper_Container>
          <NoDataMessage>Loading table data...</NoDataMessage>
        </TablePriorActionsWrapper_Container>
      </TablePriorActionsContainer>
    );
  }

  if (errorMessage) {
    return (
      <TablePriorActionsContainer>
        <TablePriorActionsWrapper_Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              fontSize: '16px',
              color: '#d32f2f',
            }}
          >
            Error loading table: {errorMessage}
          </div>
        </TablePriorActionsWrapper_Container>
      </TablePriorActionsContainer>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <TablePriorActionsContainer>
        <TablePriorActionsWrapper_Container>
          <NoDataMessage>No data available</NoDataMessage>
        </TablePriorActionsWrapper_Container>
      </TablePriorActionsContainer>
    );
  }

  return (
    <TablePriorActionsContainer>
      <TablePriorActionsWrapper_Container>
        <TablePriorActionsWrapper data={rows} columns={columns} rowKey="id" />
      </TablePriorActionsWrapper_Container>
    </TablePriorActionsContainer>
  );
};

export default TablePriorActions;

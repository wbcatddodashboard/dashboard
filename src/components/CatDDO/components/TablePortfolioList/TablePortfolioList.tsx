'use client';

import React from 'react';
import type { TableColumn } from 'vizonomy';
import {
  TableFundingContainer,
  TableFundingWrapper,
  TableCellText,
  TableFundingNote,
} from '../TableFundingDDO/styled/TableFundingDDO.styled';
import { useTablePortfolioList } from './useTablePortfolioList';
import type { PortfolioListRow } from './TablePortfolioList.d';

export function TablePortfolioList() {
  const { rows } = useTablePortfolioList();

  const columns: TableColumn<PortfolioListRow>[] = [
    {
      id: 'projectId',
      key: 'projectId',
      label: 'Project ID',
      width: 90,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'country',
      key: 'country',
      label: 'Country',
      width: 120,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'projectName',
      key: 'projectName',
      label: 'Project Name',
      width: 260,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'fiscalYear',
      key: 'fiscalYear',
      label: 'Fiscal Year',
      width: 80,
      align: 'center',
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'status',
      key: 'status',
      label: 'Status',
      width: 90,
      align: 'center',
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'activationForCovid',
      key: 'activationForCovid',
      label: 'Activation for COVID',
      width: 120,
      align: 'center',
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'financier',
      key: 'financier',
      label: 'Project Financier',
      width: 120,
      align: 'center',
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'region',
      key: 'region',
      label: 'Region',
      width: 80,
      align: 'center',
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'globalPractice',
      key: 'globalPractice',
      label: 'Global Practice',
      width: 180,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'operationType',
      key: 'operationType',
      label: 'Mixed/Standalone',
      width: 140,
      align: 'center',
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'triggerText',
      key: 'triggerText',
      label: 'Trigger from Loan/Financing Agreements',
      width: 400,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'additionalInfo',
      key: 'additionalInfo',
      label: 'Additional Information from Minutes & Program Document',
      width: 360,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'healthRelatedEmergencies',
      key: 'healthRelatedEmergencies',
      label: 'Health Related emergencies mentioned in the Trigger',
      width: 320,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
    {
      id: 'disastersTriggered',
      key: 'disastersTriggered',
      label: 'Disasters that have triggered the Cat DDO',
      width: 320,
      render: (v: string) => <TableCellText>{v}</TableCellText>,
    },
  ];

  return (
    <TableFundingContainer>
      <TableFundingWrapper
        data={rows}
        columns={columns}
        maxBodyHeight={420}
        scroll={{ x: 2600 }}
        sorting={{ multiple: false }}
      />
      <TableFundingNote>
        Cat_DDO_Portfolio.csv columns mapped as: P# → Project ID; Country →
        Country; Description → Project Name; Fiscal Year → Fiscal Year; Status →
        Status; Activation for COVID → Activation for COVID; Source → Project
        Financier; Region → Region; Global Practice → Global Practice;
        Standalone/Mixed → Mixed/Standalone.
      </TableFundingNote>
    </TableFundingContainer>
  );
}

export default TablePortfolioList;

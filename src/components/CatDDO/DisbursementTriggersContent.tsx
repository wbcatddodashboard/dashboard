import React from 'react';
import {
  DisbursementTriggersContainer,
  DisbursementTriggersTitle,
} from './styled';
import { TablePortfolioList } from './components';

export const DisbursementTriggersContent = () => {
  return (
    <DisbursementTriggersContainer>
      <DisbursementTriggersTitle>
        Cat DDO Disbursement Triggers Content
      </DisbursementTriggersTitle>
      <TablePortfolioList />
    </DisbursementTriggersContainer>
  );
};

export default DisbursementTriggersContent;

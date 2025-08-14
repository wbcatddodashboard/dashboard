import * as React from 'react';
import { PriorActionsChart } from './components/PriorActionsChart';
import { TablePriorActions } from './components/TablePriorActions';
import {
  PriorActionsWrapper,
  PriorActionsContainer,
  PriorActionsTitle,
  PriorActionsContentWrapper,
  PriorActionsChartContainer,
  PriorActionsTableSection,
} from './styled/PriorActionsResultIndicators.styled';

export const PriorActionsResultIndicators = () => {
  return (
    <PriorActionsWrapper>
      <PriorActionsContainer>
        <PriorActionsTitle>
          Prior Actions and Result indicators
        </PriorActionsTitle>

        <PriorActionsContentWrapper>
          <PriorActionsChartContainer>
            <PriorActionsChart />
          </PriorActionsChartContainer>

          <PriorActionsTableSection>
            <TablePriorActions />
          </PriorActionsTableSection>
        </PriorActionsContentWrapper>
      </PriorActionsContainer>
    </PriorActionsWrapper>
  );
};

export default PriorActionsResultIndicators;

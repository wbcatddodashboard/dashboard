import React from 'react';
import {
  PortfolioContainer,
  PortfolioTitle,
  PortfolioDescription,
  ChartsContainer,
  PortfolioWrapper,
} from './styled';
import { RegionChart, StatusChart, TablePortfolioList } from './components';
import OverViewCatDDO from './OverViewCatDDO';
import { GlobalCatDDO } from './GlobalCatDDO';

export const PortfolioContent = () => {
  return (
    <PortfolioWrapper>
      <PortfolioContainer>
        <PortfolioTitle>
          Overview of the evolution and composition of the Cat DDO portfolio
        </PortfolioTitle>
        <PortfolioDescription>
          As of DATE, 58 Cat DDOs have been approved in 36 countries, with 32 of
          these operations having already been closed. There are additional 15
          Cat DDOs currently in the pipeline.
        </PortfolioDescription>
      </PortfolioContainer>

      <ChartsContainer>
        <RegionChart />
        <StatusChart />
      </ChartsContainer>
      <OverViewCatDDO />
      <TablePortfolioList />
      <GlobalCatDDO />
    </PortfolioWrapper>
  );
};

export default PortfolioContent;

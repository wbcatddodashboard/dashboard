'use client';

import * as React from 'react';
import { GlobalChart } from './components/GlobalChart';
import {
  GlobalWrapper,
  GlobalContainer,
  GlobalTitle,
  GlobalContentWrapper,
  GlobalBulletPointsContainer,
  GlobalBulletPoint,
  GlobalSubBulletPointsContainer,
  GlobalSubBulletPoint,
} from './styled/GlobalCatDDO.styled';
import { SemiboldText } from './styled/OverViewCatDDO.styled';
import { useFetchTextSummary } from '@/hooks/useFetchTextSummary';

export const GlobalCatDDO = () => {
  const { data, isLoading } = useFetchTextSummary();

  // Format number with commas for display (no decimals)
  const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Get the commitment values from the API data, with fallback
  const mixedAllCommit = data?.numbers?.mixedAllCommit ?? 0;
  const mixedCatCommit = data?.numbers?.mixedCatCommit ?? 0;

  return (
    <GlobalWrapper>
      <GlobalContainer>
        <GlobalTitle>
          Distribution of DPF Cat DDOs by Global Department and Operation Type
        </GlobalTitle>

        <GlobalContentWrapper>
          <GlobalBulletPointsContainer>
            <GlobalBulletPoint>
              Operations that include DPF Cat DDOs are evolving from standalone
              catastrophe-contingent financing operations to being increasingly
              integrated as part of DPOs and DPO series, offering a mix of
              upfront financing and catastrophe-contingent financing through a
              single operation.
              <GlobalSubBulletPointsContainer>
                <GlobalSubBulletPoint>
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      Across the portfolio, of the{' '}
                      <SemiboldText>
                        US${formatNumber(mixedAllCommit)} million
                      </SemiboldText>{' '}
                      committed to DPOs combining upfront budget support with
                      the DPF Cat DDO instrument,{' '}
                      <SemiboldText>
                        US${formatNumber(mixedCatCommit)} million
                      </SemiboldText>{' '}
                      has been allocated specifically to DPF Cat DDOs.
                    </>
                  )}
                </GlobalSubBulletPoint>
                <GlobalSubBulletPoint>
                  This shift is reflected in the growing number of DPF Cat DDOs
                  prepared under series of DPOs led by Economic Policy teams. In
                  contrast, the Urban, Resilience and Land Global Department has
                  primarily prepared standalone operations with a DRM-focused
                  PDO and program which exclusively provide
                  catastrophe-contingent budget support.
                </GlobalSubBulletPoint>
              </GlobalSubBulletPointsContainer>
            </GlobalBulletPoint>
          </GlobalBulletPointsContainer>

          <GlobalChart />
        </GlobalContentWrapper>
      </GlobalContainer>
    </GlobalWrapper>
  );
};

export default GlobalCatDDO;

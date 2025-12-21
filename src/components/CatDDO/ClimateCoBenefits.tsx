'use client';

import * as React from 'react';
import { StandaloneChart, MixedDPOChart } from './components';
import {
  ClimateWrapper,
  ClimateContainer,
  ClimateTitle,
  ClimateContentWrapper,
  ClimateBulletPointsContainer,
  ClimateBulletPoint,
  ClimateSubBulletPointsContainer,
  ClimateSubBulletPoint,
  ClimateChartsContainer,
} from './styled';
import { SemiboldText } from './styled';
import { useFetchClimateSummary } from '@/hooks/useFetchClimateSummary';

export const ClimateCoBenefits = () => {
  const { data, isLoading } = useFetchClimateSummary();

  const avgAll = data?.avgAll ?? 0;
  const avgStandalone = data?.avgStandalone ?? 0;
  const avgMixed = data?.avgMixed ?? 0;

  return (
    <ClimateWrapper>
      <ClimateContainer>
        <ClimateTitle>Climate Co-Benefits</ClimateTitle>

        <ClimateContentWrapper>
          <ClimateBulletPointsContainer>
            <ClimateBulletPoint>
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  Across all the portfolio, on average, DPF Cat DDO financing
                  achieves{' '}
                  <SemiboldText>{avgAll}% climate co-benefits</SemiboldText>,
                  driven predominantly by adaptation.
                </>
              )}
              <ClimateSubBulletPointsContainer>
                <ClimateSubBulletPoint>
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      When implemented as standalone contingent-financing
                      operations, DPF Cat DDOs are significantly more effective,
                      achieving an average of{' '}
                      <SemiboldText>
                        {avgStandalone}% climate co-benefits
                      </SemiboldText>
                      .
                    </>
                  )}
                </ClimateSubBulletPoint>
                <ClimateSubBulletPoint>
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      In comparison, operations attain only{' '}
                      <SemiboldText>{avgMixed}%</SemiboldText> when integrating
                      a DPF Cat DDO into a DPO (&quot;mixed DPO&quot;) that
                      combines upfront budget support with
                      catastrophe-contingent financing.
                    </>
                  )}
                </ClimateSubBulletPoint>
              </ClimateSubBulletPointsContainer>
            </ClimateBulletPoint>
          </ClimateBulletPointsContainer>

          <ClimateChartsContainer>
            <StandaloneChart />
            <MixedDPOChart />
          </ClimateChartsContainer>
        </ClimateContentWrapper>
      </ClimateContainer>
    </ClimateWrapper>
  );
};

export default ClimateCoBenefits;

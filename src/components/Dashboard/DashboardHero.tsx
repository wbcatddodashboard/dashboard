import React from 'react';
import {
  DashboardInnerContainer,
  HeroWrapper,
  TextContentSection,
  TitleSection,
  DashboardTitle,
  DescriptionSection,
  DescriptionParagraph,
  DescriptionParagraphLast,
  BoldText,
  MapVisualizationSection,
  BackgroundMapContainer,
  MainMapContainer,
} from '@/components/Welcome/Welcome.styled';
import { useFetchMetadata } from '@/hooks/useFetchMetadata';
import { formatLastUpdate } from '@/utils/date-utils';

export function DashboardHero() {
  const { metadata, isLoading } = useFetchMetadata();

  const formattedDate = formatLastUpdate(metadata, isLoading);

  return (
    <DashboardInnerContainer>
      <HeroWrapper>
        <TextContentSection>
          <TitleSection>
            <DashboardTitle>DPF Cat DDO Dashboard</DashboardTitle>
          </TitleSection>

          <DescriptionSection>
            <DescriptionParagraph>
              This dashboard shows key insights from Development Policy
              Financing (DPF) with Catastrophe Deferred Drawdown Option (Cat
              DDO) operations, which provide timely access to liquidity
              following disasters or public health-related emergencies, while
              supporting institutional and policy reforms that strengthen
              disaster risk management and enhance resilience.
            </DescriptionParagraph>
            <DescriptionParagraph>
              The dashboard has been developed with the financial support from
              the Japan-World Bank Program for Mainstreaming Disaster Risk
              Management (DRM) in Developing Countries managed by GFDRR Tokyo
              Hub under the URL Disaster Risk Management GSG.
            </DescriptionParagraph>
            <DescriptionParagraph>
              <span>
                Designed to support knowledge generation and internal
                monitoring, this dashboard visualizes portfolio-level trends,
                core statistics, and patterns of policy reform from Cat DDOs.
              </span>
            </DescriptionParagraph>
            <DescriptionParagraphLast>
              <BoldText>Data last updated: {formattedDate}.</BoldText> The data
              will be updated at least semi-annually.
            </DescriptionParagraphLast>
          </DescriptionSection>
        </TextContentSection>

        <MapVisualizationSection>
          <BackgroundMapContainer />
          <MainMapContainer />
        </MapVisualizationSection>
      </HeroWrapper>
    </DashboardInnerContainer>
  );
}

export default DashboardHero;

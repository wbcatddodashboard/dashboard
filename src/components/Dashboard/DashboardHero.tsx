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
  ItalicText,
  MapVisualizationSection,
  BackgroundMapContainer,
  MainMapContainer,
} from '@/components/Welcome/Welcome.styled';

export function DashboardHero() {
  return (
    <DashboardInnerContainer>
      <HeroWrapper>
        <TextContentSection>
          <TitleSection>
            <DashboardTitle>CAT DDO Dashboard</DashboardTitle>
          </TitleSection>

          <DescriptionSection>
            <DescriptionParagraph>
              This dashboard shows key insights from DPF with Cat DDO
              operations. The Cat DDO is an instrument that provides countries
              with timely access to liquidity following disasters or public
              health-related emergencies, while supporting institutional and
              policy reforms that strengthen disaster risk management and
              enhance resilience.
            </DescriptionParagraph>
            <DescriptionParagraphLast>
              <span>
                Designed to support knowledge generation and internal
                monitoring, this dashboard visualizes portfolio-level trends,
                core statistics, and patterns of policy reform from Cat
                DDOs.{' '}
              </span>
              <ItalicText>Last update: 08 Aug 2025.</ItalicText>
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

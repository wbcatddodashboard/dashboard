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
import { useFetchMetadata } from '@/hooks/useFetchMetadata';

export function DashboardHero() {
  const { metadata, isLoading } = useFetchMetadata();

  const formatLastUpdate = () => {
    if (
      isLoading ||
      !metadata.Update_Day ||
      !metadata.Update_Month ||
      !metadata.Update_Year
    ) {
      return 'Loading...';
    }

    const day = metadata.Update_Day.padStart(2, '0');
    const month = metadata.Update_Month.substring(0, 3);
    const year = metadata.Update_Year;

    return `${day} ${month} ${year}`;
  };

  return (
    <DashboardInnerContainer>
      <HeroWrapper>
        <TextContentSection>
          <TitleSection>
            <DashboardTitle>CAT DDO Dashboard</DashboardTitle>
          </TitleSection>

          <DescriptionSection>
            <DescriptionParagraph>
              This dashboard shows key insights from Development Policy
              Financing (DPF) with Catastrophe Deferred Drawdown Option (Cat
              DDO) operations. with timely access to liquidity following
              disasters or public health-related emergencies, while supporting
              institutional and policy reforms that strengthen disaster risk
              management and enhance resilience.
            </DescriptionParagraph>
            <DescriptionParagraphLast>
              <span>
                Designed to support knowledge generation and internal
                monitoring, this dashboard visualizes portfolio-level trends,
                core statistics, and patterns of policy reform from Cat
                DDOs.{' '}
              </span>
              <ItalicText>
                Data last updated: {formatLastUpdate()}. The data will be
                updated semiannually.
              </ItalicText>
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

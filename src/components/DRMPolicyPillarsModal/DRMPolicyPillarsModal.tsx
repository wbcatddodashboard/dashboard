import React from 'react';
import { Button, StepModal } from 'vizonomy';
import { useFetchMetadata } from '@/hooks/useFetchMetadata';
import { formatLastUpdate } from '@/utils/date-utils';
import {
  ContentContainer,
  DescriptionContainer,
  DescriptionText,
  DiagramContainer,
  PillarsRow,
  PillarColumn,
  PillarBox,
  SubPillarBox,
  PillarText,
  SubPillarText,
  ButtonContainer,
} from './DRMPolicyPillarsModal.styled';

interface DRMPolicyPillarsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRMPolicyPillarsModal: React.FC<DRMPolicyPillarsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { metadata, isLoading } = useFetchMetadata();

  const pillars = [
    {
      id: 1,
      name: 'Legal and Institutional DRM Framework',
      color: '#e4a3a3',
      lightColor: 'rgba(228, 163, 163, 0.4)',
      subPillars: [
        'DRM policies and institutions',
        'Mainstreaming DRM into national development plans',
      ],
    },
    {
      id: 2,
      name: 'Risk Identification',
      color: '#e4e4a3',
      lightColor: 'rgba(228, 228, 163, 0.4)',
      subPillars: [],
    },
    {
      id: 3,
      name: 'Risk Reduction',
      color: '#a3e4a3',
      lightColor: 'rgba(163, 228, 163, 0.4)',
      subPillars: [
        'Territorial and urban planning',
        'Public investment at the central level',
        'Sector-specific risk reduction measures',
      ],
    },
    {
      id: 4,
      name: 'Preparedness',
      color: '#a3e4e4',
      lightColor: 'rgba(163, 228, 228, 0.4)',
      subPillars: [
        'Early Warning Systems',
        'Emergency Preparedness and Response',
        'Adaptive Social Protection',
      ],
    },
    {
      id: 5,
      name: 'Financial Protection',
      color: '#a3a3e4',
      lightColor: 'rgba(163, 163, 228, 0.4)',
      subPillars: [
        'Fiscal risk',
        'Disaster Risk Financing strategies and instruments',
      ],
    },
    {
      id: 6,
      name: 'Resilient Reconstruction',
      color: '#e4a3e4',
      lightColor: 'rgba(228, 163, 228, 0.4)',
      subPillars: [
        'DRM policies and institutions',
        'DRM policies and institutions',
      ],
    },
  ];

  return (
    <StepModal.Root isOpen={isOpen} onClose={onClose}>
      <StepModal.Overlay className="z-[9999]">
        <StepModal.Content
          size="xl"
          className="!w-[900px] max-w-[900px] max-h-[90vh] overflow-y-auto z-[10000] !bg-[#f9fafb] shadow-2xl"
        >
          <StepModal.Header>
            <StepModal.Title className="text-[32px] font-bold !text-[#295e84] leading-[40px]">
              Understanding Data
            </StepModal.Title>
            <StepModal.Close />
          </StepModal.Header>

          <StepModal.Body className="px-8 py-[41px]">
            <StepModal.Step>
              <ContentContainer>
                <DescriptionContainer>
                  <DescriptionText>
                    This dashboard compiles information extracted from the World
                    Bank operations portal as of{' '}
                    {formatLastUpdate(metadata, isLoading)}. It covers three
                    essential dimensions related to Cat DDOs: (i) portfolio
                    financial trends, (ii) Cat DDO policy program and
                    DRM-related reforms supported through past operations, and
                    (iii) Cat DDO disbursement triggers' definition and use.
                  </DescriptionText>
                </DescriptionContainer>

                <DiagramContainer>
                  <PillarsRow>
                    {pillars.map((pillar) => (
                      <PillarColumn key={pillar.id}>
                        <PillarBox backgroundColor={pillar.color}>
                          <PillarText>{pillar.name}</PillarText>
                        </PillarBox>

                        {pillar.subPillars.map((subPillar, index) => (
                          <SubPillarBox
                            key={index}
                            backgroundColor={pillar.lightColor}
                          >
                            <SubPillarText>{subPillar}</SubPillarText>
                          </SubPillarBox>
                        ))}
                      </PillarColumn>
                    ))}
                  </PillarsRow>
                </DiagramContainer>
              </ContentContainer>
            </StepModal.Step>
          </StepModal.Body>

          <StepModal.Footer>
            <ButtonContainer>
              <Button
                variant="primary"
                size="md"
                onClick={onClose}
                className="bg-[#295e84] text-white px-6 py-[13px] rounded-[99px] font-bold text-[14px] leading-[20px] tracking-[-0.15px] hover:bg-[#1e4a6b] transition-colors"
              >
                Close
              </Button>
            </ButtonContainer>
          </StepModal.Footer>
        </StepModal.Content>
      </StepModal.Overlay>
    </StepModal.Root>
  );
};

export default DRMPolicyPillarsModal;

import React from 'react';
import { Button, StepModal } from 'vizonomy';
import {
  ContentContainer,
  DescriptionContainer,
  DescriptionText,
  LinkText,
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
      <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center p-4">
        <StepModal.Content
          size="xl"
          className="w-auto max-w-[95vw] min-w-[800px] relative z-[10000] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl"
        >
          <StepModal.Header>
            <StepModal.Title className="text-[32px] font-bold text-[#295e84] leading-[40px]">
              The DRM Policy Pillars
            </StepModal.Title>
            <StepModal.Close />
          </StepModal.Header>

          <StepModal.Body className="px-8 py-[41px]">
            <StepModal.Step>
              <ContentContainer>
                {/* Description paragraphs */}
                <DescriptionContainer>
                  <DescriptionText>
                    To analyze trends and distribution patterns in policy
                    reforms supported by Cat DDOs, Prior Actions were classified
                    according to the World Bank's DRM framework. Originally
                    proposed by <LinkText>Ghesquiere et al. (2012)</LinkText>{' '}
                    and fully aligned with the Sendai Framework for DRR, this
                    framework comprises six pillars that reflect the key areas
                    of engagement typically supported through Cat DDOs. Where
                    relevant, the pillars are further disaggregated into
                    sub-pillars to provide greater analytical granularity.
                  </DescriptionText>

                  <DescriptionText>
                    The DRM framework offers a standardized structure to map
                    reforms, track progress, and identify policy gaps across
                    critical dimensions of resilience-building. It also serves
                    as a practical tool to inform the design of DRM policy
                    programs that adopt a systems-based approach to
                    strengthening resilience. While individual PAs may
                    contribute to multiple pillars, a simplifying assumption was
                    applied for classification purposes: each DRM-related PA was
                    assigned to a single pillar based on predefined keywords and
                    expert judgment.
                  </DescriptionText>
                </DescriptionContainer>

                {/* DRM Policy Pillars Diagram */}
                <DiagramContainer>
                  <PillarsRow>
                    {pillars.map((pillar) => (
                      <PillarColumn key={pillar.id}>
                        {/* Main pillar */}
                        <PillarBox backgroundColor={pillar.color}>
                          <PillarText>{pillar.name}</PillarText>
                        </PillarBox>

                        {/* Sub-pillars */}
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
                Enter
              </Button>
            </ButtonContainer>
          </StepModal.Footer>
        </StepModal.Content>
      </div>
    </StepModal.Root>
  );
};

export default DRMPolicyPillarsModal;

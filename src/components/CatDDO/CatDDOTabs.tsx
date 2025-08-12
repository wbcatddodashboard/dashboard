import React, { useState } from 'react';
import Image from 'next/image';
import { PortfolioContent } from './PortfolioContent';
import { PolicyProgramContent } from './PolicyProgramContent';
import { DisbursementTriggersContent } from './DisbursementTriggersContent';
import {
  TabTextContainer,
  TabContentWithIcon,
  IconContainer,
  TabsWrapper,
  TabsInnerContainer,
  TabStyledWrapper,
  TabTextParagraph,
} from './styled';

export function TabText({ children }: { children: React.ReactNode }) {
  return (
    <TabTextContainer>
      <TabTextParagraph>{children}</TabTextParagraph>
    </TabTextContainer>
  );
}

export function CatDDOTabs() {
  const [activeTabId, setActiveTabId] = useState<string>('portfolio');

  const tabs = [
    {
      id: 'portfolio',
      label: <TabText>Cat DDO Portfolio</TabText>,
      content: <PortfolioContent />,
    },
    {
      id: 'policy',
      label: (
        <TabContentWithIcon>
          <TabText>Cat DDO Policy Program</TabText>
          <IconContainer>
            <Image
              src="/info-icon-figma.svg"
              alt="Info"
              width={20}
              height={20}
              className="block max-w-none size-full"
            />
          </IconContainer>
        </TabContentWithIcon>
      ),
      content: <PolicyProgramContent />,
    },
    {
      id: 'triggers',
      label: <TabText>Cat DDO Disbursement Triggers</TabText>,
      content: <DisbursementTriggersContent />,
    },
  ];

  return (
    <TabsWrapper>
      <TabsInnerContainer>
        <TabStyledWrapper
          tabs={tabs}
          defaultActiveTabId="portfolio"
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
        />
      </TabsInnerContainer>
    </TabsWrapper>
  );
}

export default CatDDOTabs;

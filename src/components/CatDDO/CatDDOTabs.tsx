import React, { useState } from 'react';
import { PortfolioContent } from './PortfolioContent';
import { PolicyProgramContent } from './PolicyProgramContent';
import { DisbursementTriggersContent } from './DisbursementTriggersContent';
import {
  TabTextContainer,
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
      label: <TabText>Cat DDO Policy Program</TabText>,
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

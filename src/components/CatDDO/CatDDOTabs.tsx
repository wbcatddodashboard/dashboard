import React, { useState } from 'react';
import Image from 'next/image';
import Tabs from '@/lib/ui/Tab';
import { PortfolioContent } from './PortfolioContent';
import { PolicyProgramContent } from './PolicyProgramContent';
import { DisbursementTriggersContent } from './DisbursementTriggersContent';
import { OverViewCatDDO } from './OverViewCatDDO';
import {
  TabTextContainer,
  TabContentWithIcon,
  IconContainer,
  TabsWrapper,
  TabsInnerContainer,
} from './styled';

export function TabText({ children }: { children: React.ReactNode }) {
  return (
    <TabTextContainer>
      <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
        {children}
      </p>
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
    {
      id: 'overview',
      label: <TabText>Financial Overview</TabText>,
      content: <OverViewCatDDO />,
    },
  ];

  return (
    <TabsWrapper>
      <TabsInnerContainer>
        <Tabs
          tabs={tabs}
          defaultActiveTabId="portfolio"
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          className="w-full"
          tabListClassName="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative size-full"
          tabButtonClassName="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-2 relative rounded-[99px] shrink-0 hover:bg-[#edeef0]/70 transition-colors"
          activeTabButtonClassName="bg-[#edeef0]"
          tabPanelClassName="mt-4"
        />
      </TabsInnerContainer>
    </TabsWrapper>
  );
}

export default CatDDOTabs;

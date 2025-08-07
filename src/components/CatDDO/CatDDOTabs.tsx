import React from 'react';
import Image from 'next/image';
import Tabs from '@/lib/ui/Tab';
import { PortfolioContent } from './PortfolioContent';
import { PolicyProgramContent } from './PolicyProgramContent';
import { DisbursementTriggersContent } from './DisbursementTriggersContent';

// Tab text component for consistent styling
export function TabText({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#295e84] text-[16px] text-left text-nowrap tracking-[0.15px]">
      <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
        {children}
      </p>
    </div>
  );
}

export function CatDDOTabs() {
  const tabs = [
    {
      id: 'portfolio',
      label: (
        <TabText>
          Cat DDO Portfolio
        </TabText>
      ),
      content: <PortfolioContent />,
    },
    {
      id: 'policy',
      label: (
        <div className="flex flex-row gap-[5px] items-center">
          <TabText>
            Cat DDO Policy Program
          </TabText>
          <div className="relative shrink-0 size-5">
            <Image
              src="/info-icon-figma.svg"
              alt="Info"
              width={20}
              height={20}
              className="block max-w-none size-full"
            />
          </div>
        </div>
      ),
      content: <PolicyProgramContent />,
    },
    {
      id: 'triggers',
      label: (
        <TabText>
          Cat DDO Disbursement Triggers
        </TabText>
      ),
      content: <DisbursementTriggersContent />,
    },
  ];

  return (
    <div className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <Tabs
          tabs={tabs}
          defaultActiveTabId="portfolio"
          className="w-full"
          tabListClassName="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative size-full"
          tabButtonClassName="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-2 relative rounded-[99px] shrink-0 hover:bg-[#edeef0]/70 transition-colors"
          activeTabButtonClassName="bg-[#edeef0]"
          tabPanelClassName="mt-4"
        />
      </div>
    </div>
  );
}

export default CatDDOTabs;

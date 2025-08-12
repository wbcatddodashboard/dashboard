import type { ReactNode } from 'react';
import { Tabs, TabsProps } from 'vizonomy';

interface ChildrenProps {
  children: ReactNode;
}

export function TabTextContainer({ children }: ChildrenProps) {
  return (
    <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#295e84] text-[16px] text-left text-nowrap tracking-[0.15px]">
      {children}
    </div>
  );
}

export function TabContentWithIcon({ children }: ChildrenProps) {
  return <div className="flex flex-row gap-[5px] items-center">{children}</div>;
}

export function IconContainer({ children }: ChildrenProps) {
  return <div className="relative shrink-0 size-5">{children}</div>;
}

export function TabsWrapper({ children }: ChildrenProps) {
  return (
    <div className="w-full border-t border-gray-200 bg-white">{children}</div>
  );
}

export function TabsInnerContainer({ children }: ChildrenProps) {
  return <div className="max-w-7xl mx-auto px-8 py-4">{children}</div>;
}

export function TabTextParagraph({ children }: ChildrenProps) {
  return (
    <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
      {children}
    </p>
  );
}

export const TabStyledWrapper = (props: TabsProps) => {
  return (
    <Tabs
      {...props}
      className="w-full"
      tabListClassName="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative size-full"
      tabButtonClassName="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-2 relative rounded-[99px] shrink-0 hover:bg-[#EDEEF0]/70 transition-colors"
      activeTabButtonClassName="bg-[#EDEEF0]"
      tabPanelClassName="mt-4"
    />
  );
};

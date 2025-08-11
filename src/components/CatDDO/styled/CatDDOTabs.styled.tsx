import type { ReactNode } from 'react';

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

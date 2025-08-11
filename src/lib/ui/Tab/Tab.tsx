import React from 'react';

import type { TabsProps, TabButtonProps } from './Tab.d';
import { useTabs } from './useTab';

function TabButton({ children, ...props }: TabButtonProps) {
  return <button {...props}>{children}</button>;
}

function Tabs({
  tabs,
  activeTabId,
  defaultActiveTabId,
  onTabChange,
  className = '',
  ...props
}: TabsProps) {
  const { activeTab, getTabButtonProps, getTabPanelProps } = useTabs({
    tabs,
    activeTabId,
    defaultActiveTabId,
    onTabChange,
  });

  return (
    <div className={className} {...props}>
      <div role="tablist">
        {tabs.map((tab) => (
          <TabButton key={tab.id} {...getTabButtonProps(tab)}>
            {tab.label}
          </TabButton>
        ))}
      </div>

      {activeTab && (
        <div {...getTabPanelProps(activeTab)}>{activeTab.content}</div>
      )}
    </div>
  );
}

export default Tabs;
export { TabButton };

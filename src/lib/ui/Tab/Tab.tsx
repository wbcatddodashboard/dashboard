import React from 'react';

import type { TabsProps, TabButtonProps } from './Tab.d';
import { useTabs } from './useTab';

function TabButton({
  children,
  isActive = false,
  className = '',
  ...props
}: TabButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

function Tabs({
  tabs,
  activeTabId,
  defaultActiveTabId,
  onTabChange,
  className = '',
  tabListClassName = '',
  tabButtonClassName = '',
  activeTabButtonClassName = '',
  tabPanelClassName = '',
  ...props
}: TabsProps) {
  const { 
    activeTabId: currentActiveTabId, 
    activeTab, 
    getTabButtonProps, 
    getTabPanelProps 
  } = useTabs({
    tabs,
    activeTabId,
    defaultActiveTabId,
    onTabChange,
  });

  return (
    <div className={className} {...props}>
      <div role="tablist" className={tabListClassName}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            {...getTabButtonProps(tab)}
            isActive={tab.id === currentActiveTabId}
            className={`${tabButtonClassName} ${tab.id === currentActiveTabId ? activeTabButtonClassName : ''}`}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
      
      {activeTab && (
        <div {...getTabPanelProps(activeTab)} className={tabPanelClassName}>
          {activeTab.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
export { TabButton };
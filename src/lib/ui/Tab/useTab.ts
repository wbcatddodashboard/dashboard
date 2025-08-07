import { useState } from 'react';
import type { UseTabsProps, TabItem } from './Tab.d';

export const useTabs = ({
  tabs,
  activeTabId,
  defaultActiveTabId,
  onTabChange,
}: UseTabsProps) => {
  const [internalActiveTabId, setInternalActiveTabId] = useState<string>(
    defaultActiveTabId ?? tabs[0]?.id ?? ''
  );

  const currentActiveTabId = activeTabId ?? internalActiveTabId;

  const handleTabChange = (tabId: string) => {
    if (activeTabId === undefined) {
      setInternalActiveTabId(tabId);
    }
    onTabChange?.(tabId);
  };

  const activeTab = tabs.find(tab => tab.id === currentActiveTabId);

  const getTabButtonProps = (tab: TabItem) => ({
    onClick: () => handleTabChange(tab.id),
    role: 'tab' as const,
    'aria-selected': tab.id === currentActiveTabId,
    'aria-controls': `tabpanel-${tab.id}`,
    id: `tab-${tab.id}`,
    tabIndex: tab.id === currentActiveTabId ? 0 : -1,
    type: 'button' as const,
    disabled: tab.disabled,
  });

  const getTabPanelProps = (tab: TabItem) => ({
    role: 'tabpanel' as const,
    'aria-labelledby': `tab-${tab.id}`,
    id: `tabpanel-${tab.id}`,
    hidden: tab.id !== currentActiveTabId,
  });

  return {
    activeTabId: currentActiveTabId,
    activeTab,
    handleTabChange,
    getTabButtonProps,
    getTabPanelProps,
  };
};
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  defaultActiveTabId?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  tabListClassName?: string;
  tabButtonClassName?: string;
  activeTabButtonClassName?: string;
  tabPanelClassName?: string;
}

export interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
}

export interface UseTabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  defaultActiveTabId?: string;
  onTabChange?: (tabId: string) => void;
}


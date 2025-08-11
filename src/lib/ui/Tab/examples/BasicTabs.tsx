import React from 'react';

import Tabs, { type TabsProps, type TabItem } from '../index';
import homeIcon from './icons/home-icon.svg';
import profileIcon from './icons/profile-icon.svg';

const basicTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: (
      <div>
        <h3>Content for Tab 1</h3>
        <p>This is the content for the first tab.</p>
      </div>
    ),
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: (
      <div>
        <h3>Content for Tab 2</h3>
        <p>This is the content for the second tab.</p>
      </div>
    ),
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: (
      <div>
        <h3>Content for Tab 3</h3>
        <p>This is the content for the third tab.</p>
      </div>
    ),
  },
];

const tabsWithCustomLabels: TabItem[] = [
  {
    id: 'home',
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={homeIcon}
          alt="Home"
          style={{ width: '16px', height: '16px' }}
        />
        Home
      </span>
    ),
    content: (
      <div>
        <h3>Home Content</h3>
        <p>Welcome to the home section with a custom SVG icon in the label.</p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: (
      <span style={{ fontWeight: 'bold', color: '#666' }}>⚙️ Settings</span>
    ),
    content: (
      <div>
        <h3>Settings Content</h3>
        <p>Configure your preferences here with an emoji and styled text.</p>
      </div>
    ),
  },
  {
    id: 'profile',
    label: (
      <div style={{ textAlign: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profileIcon}
          alt="Profile"
          style={{
            width: '20px',
            height: '20px',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <span style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
          Profile
        </span>
      </div>
    ),
    content: (
      <div>
        <h3>Profile Content</h3>
        <p>
          Manage your profile information with a custom SVG icon and vertical
          layout.
        </p>
      </div>
    ),
  },
];

export interface BasicTabsProps extends Omit<TabsProps, 'tabs'> {
  className?: string;
  variant?: 'basic' | 'customLabels';
}

function BasicTabs({
  className = '',
  variant = 'basic',
  ...props
}: BasicTabsProps) {
  const tabs = variant === 'customLabels' ? tabsWithCustomLabels : basicTabs;

  return <Tabs {...props} tabs={tabs} className={className} />;
}

export default BasicTabs;

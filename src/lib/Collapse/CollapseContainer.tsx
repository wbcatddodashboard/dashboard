import React from 'react';
import type { ContainerProps } from './Collapse.d';

function CollapseContainer({ children, ...props }: ContainerProps) {
  return <div {...props}>{children}</div>;
}

export default CollapseContainer;

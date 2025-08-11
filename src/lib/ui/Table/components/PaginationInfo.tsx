import { ReactNode } from 'react';
import { CommonPaginationInfo } from './types';

export interface PaginationInfoProps {
  paginationInfo: CommonPaginationInfo;
  template?: string;
  render?: (info: CommonPaginationInfo) => ReactNode;
  className?: string;
}

export function PaginationInfo({
  paginationInfo,
  template = 'Showing {from} to {to} of {of} entries',
  render,
  className = '',
}: PaginationInfoProps) {
  if (render) {
    return <div className={className}>{render(paginationInfo)}</div>;
  }

  const text = template
    .replace('{from}', paginationInfo.from.toString())
    .replace('{to}', paginationInfo.to.toString())
    .replace('{of}', paginationInfo.of.toString())
    .replace('{page}', paginationInfo.page.toString())
    .replace('{totalPages}', paginationInfo.totalPages.toString());

  return <div className={className}>{text}</div>;
}

export default PaginationInfo;

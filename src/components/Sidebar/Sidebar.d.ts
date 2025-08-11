export interface FilterOption {
  id: string;
  label: string;
  isSelected?: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  hasFilterIcon?: boolean;
}

export interface SidebarProps {
  className?: string;
}

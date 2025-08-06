import type { ReactNode } from 'react';
import classNames from 'classnames';

interface ChildrenProps {
  children: ReactNode;
}

export function SidebarContainer({ children, className }: ChildrenProps & { className?: string }) {
  const containerClasses = classNames(
    'bg-gray-50',
    'relative',
    'w-64',
    'flex-shrink-0',
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export function SidebarContent({ children }: ChildrenProps) {
  const containerClasses = classNames(
    'box-border',
    'content-stretch',
    'flex',
    'flex-col',
    'gap-6',
    'items-start',
    'justify-start',
    'p-[16px]',
    'relative',
    'h-full'
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export function LogoContainer({ children }: ChildrenProps) {
  const logoClasses = classNames(
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'h-10',
    'items-center',
    'justify-center',
    'overflow-clip',
    'p-0',
    'relative',
    'shadow-[0px_0px_0px_1px_rgba(26,26,26,0.06),0px_1px_1px_-6px_rgba(71,71,71,0.1),' +
    '0px_2px_4px_0px_rgba(71,71,71,0.08)]',
    'shrink-0',
    'w-52'
  );

  return (
    <div className={logoClasses}>
      {children}
    </div>
  );
}

export function LogoImage({ src }: { src: string }) {
  const imageClasses = classNames(
    'bg-center',
    'bg-cover',
    'bg-no-repeat',
    'h-[54px]',
    'shrink-0',
    'w-[191px]'
  );

  return (
    <div 
      className={imageClasses}
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
}

export function FilterSectionContainer({ children }: ChildrenProps) {
  const containerClasses = classNames(
    'box-border',
    'content-stretch',
    'flex',
    'flex-col',
    'gap-1.5',
    'items-start',
    'justify-start',
    'p-0',
    'relative',
    'shrink-0',
    'w-full'
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export function FilterSectionHeader({ children }: ChildrenProps) {
  const headerClasses = classNames(
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'gap-2',
    'h-8',
    'items-center',
    'justify-start',
    'px-2',
    'py-0',
    'relative',
    'shrink-0',
    'w-full'
  );

  return (
    <div className={headerClasses}>
      {children}
    </div>
  );
}

export function FilterSectionTitle({ children }: ChildrenProps) {
  const titleClasses = classNames(
    'basis-0',
    'font-[\'Inter:Medium\',_sans-serif]',
    'font-medium',
    'grow',
    'leading-[0]',
    'min-h-px',
    'min-w-px',
    'not-italic',
    'relative',
    'shrink-0',
    'text-[#89a3c5]',
    'text-[14px]',
    'text-left',
    'tracking-[-0.14px]'
  );

  return (
    <div className={titleClasses}>
      <p className="block leading-[16px]">{children}</p>
    </div>
  );
}

export function FilterIconContainer({ children }: ChildrenProps) {
  const containerClasses = classNames(
    'overflow-clip',
    'relative',
    'shrink-0',
    'size-5'
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export function FilterIconWrapper({ children }: ChildrenProps) {
  const wrapperClasses = classNames(
    'absolute',
    'contents',
    'inset-0'
  );

  return (
    <div className={wrapperClasses}>
      {children}
    </div>
  );
}

export function FilterIcon({ groupSrc, imageSrc }: { groupSrc: string; imageSrc: string }) {
  const iconClasses = classNames(
    'absolute',
    'bottom-[5.208%]',
    'left-[10.624%]',
    'mask-alpha',
    'mask-intersect',
    'mask-no-clip',
    'mask-no-repeat',
    'mask-position-[-2.125px_-1.042px]',
    'mask-size-[20px_20px]',
    'right-[6.75%]',
    'top-[5.208%]'
  );

  return (
    <div 
      className={iconClasses}
      style={{ maskImage: `url('${groupSrc}')` }}
    >
      <img
        alt="Filter icon"
        className="block max-w-none size-full"
        src={imageSrc}
      />
    </div>
  );
}

export function FilterOptionButton({ 
  children, 
  isSelected, 
  onClick 
}: ChildrenProps & { 
  isSelected?: boolean; 
  onClick: () => void;
}) {
  const buttonClasses = classNames(
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'h-[30px]',
    'items-center',
    'justify-between',
    'overflow-clip',
    'px-1.5',
    'py-3',
    'relative',
    'shrink-0',
    'w-full',
    'cursor-pointer',
    {
      'bg-[#edeff0] rounded': isSelected
    }
  );

  return (
    <div 
      className={buttonClasses}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
}

export function FilterOptionLabel({ children }: ChildrenProps) {
  const labelClasses = classNames(
    'basis-0',
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'gap-2',
    'grow',
    'h-4',
    'items-center',
    'justify-start',
    'min-h-px',
    'min-w-px',
    'px-2',
    'py-0',
    'relative',
    'shrink-0'
  );

  return (
    <div className={labelClasses}>
      {children}
    </div>
  );
}

export function FilterOptionText({ 
  children, 
  isSelected 
}: ChildrenProps & { isSelected?: boolean }) {
  const textClasses = classNames(
    'font-[\'Roboto:Regular\',_sans-serif]',
    'font-normal',
    'leading-[0]',
    'relative',
    'shrink-0',
    'text-[#295e84]',
    'text-[14px]',
    'text-left',
    'text-nowrap',
    'tracking-[0.25px]',
    {
      'font-["Inter:Semi_Bold",_sans-serif] font-semibold tracking-[-0.14px]': isSelected
    }
  );

  const paragraphClasses = classNames(
    'block',
    'leading-[20px]',
    'whitespace-pre',
    {
      'leading-[16px]': isSelected
    }
  );

  return (
    <div className={textClasses}>
      <p className={paragraphClasses}>
        {children}
      </p>
    </div>
  );
}

export function ActionButtonsContainer({ children }: ChildrenProps) {
  const containerClasses = classNames(
    'box-border',
    'content-stretch',
    'flex',
    'flex-col',
    'gap-3',
    'items-start',
    'justify-start',
    'p-0',
    'relative',
    'shrink-0',
    'w-full'
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export function ButtonContainer({ children }: ChildrenProps) {
  const containerClasses = classNames(
    'relative',
    'rounded-[99px]',
    'shrink-0',
    'w-full'
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

export function SidebarBorder() {
  const borderClasses = classNames(
    'absolute',
    'border-[0px_1px_0px_0px]',
    'border-gray-200',
    'border-solid',
    'inset-0',
    'pointer-events-none'
  );

  return (
    <div className={borderClasses} />
  );
} 
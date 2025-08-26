import React from 'react';

interface TooltipProps {
  title: string;
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, content }) => {
  return (
    <div className="bg-white border border-[#295e84] rounded-lg p-3 shadow-lg">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#295e84] text-[18px] text-left text-nowrap tracking-[-0.18px]">
        {title}
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full text-[#295e84]">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;

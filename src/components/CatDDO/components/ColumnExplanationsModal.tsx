import React from 'react';
import { PORTFOLIO_DATA_COLUMN_EXPLANATIONS } from '../constants/PortfolioDataColumnExplanations';

interface ColumnExplanationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColumnExplanationsModal: React.FC<
  ColumnExplanationsModalProps
> = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center p-5"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg max-w-[900px] w-full max-h-[85vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 m-0">
            Column Explanations
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center rounded hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Body with explanations */}
        <div className="overflow-y-auto p-6 flex-1">
          {PORTFOLIO_DATA_COLUMN_EXPLANATIONS.map((item, index) => (
            <div
              key={index}
              className="mb-5 pb-5 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0"
            >
              <div className="font-semibold text-gray-900 text-sm mb-1.5 font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                {item.columnName}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                {item.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

# Fix Tab Title Duplication

## Issue

The "Portfolio Data" tab and "Disbursement Triggers" tab displayed the same title ("DPF Cat DDO Disbursement Triggers Content"). This was because they shared the `TitleSection` styled component which had the title text hardcoded.

## Solution

1. Modified `src/components/CatDDO/styled/DisbursementTriggersContent.styled.tsx`:
   - Updated `TitleSection` to accept an optional `title` prop.
   - Used the prop if provided, otherwise fell back to the original text (preserving backward compatibility for the Triggers tab).
2. Modified `src/components/CatDDO/PortfolioDataContent.tsx`:
   - Passed `title="Portfolio Data"` to the `TitleSection` component.

## Result

Each tab now displays its correct, unique title.

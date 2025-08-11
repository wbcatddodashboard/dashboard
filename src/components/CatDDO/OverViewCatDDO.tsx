import * as React from 'react';
import { TableFundingDDO } from './components';
import {
  OverViewWrapper,
  OverViewContainer,
  OverViewTitle,
  ContentWrapper,
  BulletPointsContainer,
  BulletPoint,
} from './styled/OverViewCatDDO.styled';

export const OverViewCatDDO = () => {
  return (
    <OverViewWrapper>
      <OverViewContainer>
        <OverViewTitle>
          Financial overview of Cat DDOs per funding source (US$ million)
        </OverViewTitle>

        <ContentWrapper>
          <TableFundingDDO />

          <BulletPointsContainer>
            <BulletPoint>
              Cat DDOs have disbursed a total of{' '}
              <span className="font-semibold">US$4.9 billion.</span>
            </BulletPoint>
            <BulletPoint>
              There is an undisbursed balance of{' '}
              <span className="font-semibold">US$1.5 billion</span> available
              for responding to catastrophes including public health-related
              emergencies. Of the undisbursed amount,{' '}
              <span className="font-semibold">US$589 million (38%)</span> is
              allocated to EAP and{' '}
              <span className="font-semibold">US$451 million (29%)</span> to
              LAC.
            </BulletPoint>
            <BulletPoint>
              While IBRD countries account for larger undisbursed commitments{' '}
              <span className="font-semibold">
                (76% against 24% for IDA countries)
              </span>
              , there has been a notable increase in the use of Cat DDOs to
              support IDA countries since 2018.
            </BulletPoint>
            <BulletPoint>
              <span className="font-semibold">10 Cat DDOs</span> totaling US are
              under preparation in IDA countries, compared to{' '}
              <span className="font-semibold">5</span>{' '}
              <span className="font-semibold">operations amounting</span> to US
              for IBRD countries.
            </BulletPoint>
          </BulletPointsContainer>
        </ContentWrapper>
      </OverViewContainer>
    </OverViewWrapper>
  );
};

export default OverViewCatDDO;

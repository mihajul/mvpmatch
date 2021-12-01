import styled from 'styled-components';

import { BREAKPOINTS, FONT_SIZES, FONT_WEIGHTS } from '../../../styles/variables';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 6%;
  padding-right: 6%;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`;

export const HeaderText = styled.h2`
  width: 100%;
  max-width: 700px;
  font-size: ${FONT_SIZES.SIZE_6};
  font-weight: ${FONT_WEIGHTS.BLACK};
`;

export const Form = styled.form`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${BREAKPOINTS.MOBILE_END}) {
    flex-wrap: wrap;
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: 28px;
  margin-bottom: 52px;
`;

export const ConfirmText = styled.span`
  font-size: ${FONT_SIZES.SIZE_10};
`;

export const Spacer = styled.div`
  margin-bottom: 20px;
`;

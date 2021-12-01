import styled from 'styled-components';

import { BREAKPOINTS, FONT_SIZES, FONT_WEIGHTS } from '../../../styles/variables';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  padding-left: 6%;
  padding-right: 6%;
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
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${BREAKPOINTS.MOBILE_END}) {
    flex-wrap: wrap;
  }
`;

export const Spacer = styled.div`
  margin-bottom: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

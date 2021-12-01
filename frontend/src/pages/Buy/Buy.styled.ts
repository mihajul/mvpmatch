import styled from 'styled-components';

import { BREAKPOINTS, COLORS, FONT_SIZES, FONT_WEIGHTS } from '../../styles/variables';

export const CardWrapper = styled.section`
  box-sizing: border-box;
  max-width: 300px;
  padding-top: 72px;
`;

export const ErrorWrapper = styled.section`
  position: relative;
  max-width: 300px;
`;

export const Wrapper = styled.div``;

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

export const Title = styled.div`
  color: ${COLORS.BRAND_1};
  font-size: ${FONT_SIZES.SIZE_10};
`;

export const Spacer = styled.div`
  margin-bottom: 20px;
`;

export const Amount = styled.div`
  font-weight: ${FONT_WEIGHTS.EXTRABOLD};
`;

export const ChangeContainer = styled.ul``;
export const Change = styled.li``;

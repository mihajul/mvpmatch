import styled from 'styled-components';

import { BREAKPOINTS, COLORS, FONT_SIZES } from '../../styles/variables';

export const CardWrapper = styled.section`
  box-sizing: border-box;
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  text-align: left;
  border: 2px solid ${COLORS.PLAIN_10};
  background: ${COLORS.PLAIN_10};
  color: ${COLORS.BRAND_1};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 80px 28px 80px;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    padding: 32px 40px 12px 40px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.MOBILE_END}) {
    padding: 12px 20px 6px 20px;
  }
`;

export const ErrorWrapper = styled.section`
  position: relative;
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

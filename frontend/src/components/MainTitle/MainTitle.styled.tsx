import styled from 'styled-components';

import { COLORS, FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS } from '../../styles/variables';

export const MainTitle = styled.h1`
  font-style: normal;
  font-weight: ${FONT_WEIGHTS.EXTRABOLD};
  font-size: ${FONT_SIZES.SIZE_5};
  line-height: ${LINE_HEIGHTS.DEFAULT};
  color: ${COLORS.BRAND_1};
  margin: 40px 0px;
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

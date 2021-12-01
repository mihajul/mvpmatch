import styled from 'styled-components';

import { COLORS, FONT_WEIGHTS } from '../../styles/variables';

export const CardWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  box-sizing: border-box;
`;

export const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

export const GridContainer = styled.div`
  min-height: 400px;
`;

export const Deposit = styled.div`
  margin-left: 20px;
  font-weight: ${FONT_WEIGHTS.EXTRABOLD};
`;

export const SessionWarning = styled.div`
  color: ${COLORS.ACCENT_1};
`;

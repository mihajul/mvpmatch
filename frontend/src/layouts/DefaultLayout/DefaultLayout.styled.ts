import styled from 'styled-components';

import { BREAKPOINTS } from '../../styles/variables';

export const PageWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 80px 1fr 271px;
`;

export const Body = styled.main`
  width: 60%;
  min-width: 975px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    width: 100%;
    padding: 0 5%;
    min-width: 0;
  }
`;

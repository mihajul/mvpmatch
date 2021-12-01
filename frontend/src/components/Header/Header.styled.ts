import styled from 'styled-components';

import { BREAKPOINTS, COLORS } from '../../styles/variables';

export const Header = styled.header`
  display: flex;
  height: 80px;
  max-height: 80px;
  background-color: ${COLORS.PLAIN_10};
  box-sizing: border-box;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    width: 100%;
    padding: 0 5%;
  }
`;

export const HeaderContent = styled.div`
  width: 60%;
  min-width: 975px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    width: 100%;
    min-width: initial;
  }
`;

export const List = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: end;
  gap: 20px;
`;

export const ListItem = styled.div`
  cursor: pointer;
`;

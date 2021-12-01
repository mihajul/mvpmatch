import styled from 'styled-components';

import { BREAKPOINTS, COLORS, FONT_SIZES, LINE_HEIGHTS } from '../../styles/variables';

export const Container = styled.main`
  display: flex;
  overflow: hidden;
  background-color: ${COLORS.PLAIN_10};

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    flex-direction: column;
    overflow: auto;
    height: 100vh;
  }
`;

export const FirstColumn = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 40%;
  min-width: 40%;
  background: ${COLORS.BRAND_1};
  padding-left: 4%;
  padding-right: 4%;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    height: auto;
    width: 92%;
    min-width: 92%;
  }
`;

export const SecondColumn = styled.div`
  width: 52%;
  min-width: 52%;
  position: relative;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    width: 100%;
    min-width: 100%;
    flex-grow: 2;
  }
`;

export const HeaderText = styled.h1`
  color: ${COLORS.PLAIN_10};
  font-family: PlayfairDisplay;
  font-size: ${FONT_SIZES.SIZE_2};
  font-weight: 600;
  line-height: ${LINE_HEIGHTS.DEFAULT};

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    margin-top: 40px;
    margin-bottom: 50px;
    font-size: ${FONT_SIZES.SIZE_3};
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-basis: 38%;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    flex-basis: auto;
  }
`;

export const LogoImage = styled.img`
  margin-top: 80px;
  height: 40px;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    margin-top: 40px;
  }
`;

export const ChildrenContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  background-color: rgb(255, 255, 255);
  height: calc(100vh - 40px);
  overflow: auto;

  @media only screen and (max-width: ${BREAKPOINTS.TABLET_END}) {
    height: auto;
    overflow: inherit;
  }
`;

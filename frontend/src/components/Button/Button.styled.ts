import styled from 'styled-components';

import { BREAKPOINTS, COLORS, FONT_WEIGHTS } from '../../styles/variables';
import { ButtonProps } from './Button.types';

const getBackgroundColor = (props: ButtonProps) => {
  if (props.disabled) return '#F8F8F8';
  return COLORS.BRAND_1;
};

const getColor = (props: ButtonProps) => {
  if (props.disabled) return '#999999';
  return COLORS.PLAIN_9;
};

const getBorderColor = (props: ButtonProps) => {
  if (props.disabled) return COLORS.PLAIN_6;
  return COLORS.BRAND_1;
};

export const Button = styled('button')`
  display: block;
  text-decoration: none;
  color: ${getColor};
  background-color: ${getBackgroundColor};
  padding: 14px 32px;
  border-radius: 27px;
  border: 1px solid ${getBorderColor};
  font-weight: ${FONT_WEIGHTS.BLACK};
  cursor: pointer;
  pointer-events: inherit;
  text-align: center;
  height: 54px;
  min-width: 130px;
  width: min-content;
  white-space: nowrap;

  ${(props: ButtonProps) =>
    props.$loading &&
    `
    cursor: not-allowed;
    pointer-events: none;
  `}

  &:hover:not([disabled]) {
    background-color: ${COLORS.PLAIN_2};
    border: 1px solid ${COLORS.PLAIN_1};
  }

  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }

  @media only screen and (max-width: ${BREAKPOINTS.MOBILE_END}) {
    width: 100%;
  }
`;

import { FormControl } from '@material-ui/core';
import styled from 'styled-components';

import { COLORS } from '../../../styles/variables';

export const Container = styled(FormControl)`
  width: 100%;
  margin-top: 16px !important;
  margin-bottom: 7px !important;
  margin-right: 8px !important;
  .MuiOutlinedInput-root {
    background-color: ${COLORS.PLAIN_10} !important;
    color: inherit !important;
    font-family: inherit !important;
  }
  .MuiSelect-select {
    background-color: ${COLORS.PLAIN_10} !important;
  }
  .Mui-focused fieldset {
    border-color: ${COLORS.BRAND_2} !important;
  }
  &:hover fieldset {
    border-color: ${COLORS.BRAND_2} !important;
  }
  label {
    font-family: inherit !important;
  }
  label.Mui-focused {
    color: ${COLORS.BRAND_1} !important;
  }
  .MuiInputLabel-root {
    color: #999999;
  }
  select[required]:invalid {
    color: #999999;
  }
  option {
    color: ${COLORS.BRAND_1};
  }
`;

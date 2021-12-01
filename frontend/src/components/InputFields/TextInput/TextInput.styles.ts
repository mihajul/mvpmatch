import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { COLORS } from '../../../styles/variables';

export const TextFieldWithStyles = withStyles({
  root: {
    '& label': {
      fontFamily: 'inherit',
    },
    '& label.MuiInputLabel-root': {
      color: '#999999',
    },
    '& label.MuiFormLabel-filled': {
      color: COLORS.BRAND_1,
    },
    '& label.Mui-focused': {
      color: COLORS.BRAND_1,
    },
    '& .MuiOutlinedInput-root': {
      borderColor: '#eeeeee',
      fontFamily: 'inherit',
      color: COLORS.BRAND_1,
      '&:hover fieldset': {
        borderColor: COLORS.BRAND_2,
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.BRAND_2,
      },
    },
    marginBottom: '7px',
    width: '100%',
    marginRight: '8px',
  },
})(TextField);

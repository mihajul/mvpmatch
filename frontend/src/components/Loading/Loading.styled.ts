import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { COLORS } from '../../styles/variables';

export const Progress = withStyles({
  root: {
    '&.MuiCircularProgress-colorPrimary': {
      color: COLORS.PLAIN_10,
    },
  },
})(CircularProgress);

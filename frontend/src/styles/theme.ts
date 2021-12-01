import { createTheme } from '@material-ui/core/styles';

import { COLORS } from './variables';

const theme = createTheme({
  typography: {
    fontFamily: '-apple-system, Roboto, sans-serif, serif',
  },
  palette: {
    primary: {
      main: COLORS.BRAND_1,
    },
  },
});

export default theme;

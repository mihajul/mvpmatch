import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';

import { clearMessage } from '../../stores/appSlice';
import { RootState } from '../../stores';
import { Container } from './FormError.styled';

const FormError = () => {
  const { message, error } = useSelector((state: RootState) => state.app.globalAlert);
  const dispatch = useDispatch();

  if (!message) {
    return null;
  }

  return (
    <Container>
      <Alert
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={() => dispatch(clearMessage())}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={error ? 'error' : 'success'}
      >
        {message}
      </Alert>
    </Container>
  );
};

export default FormError;

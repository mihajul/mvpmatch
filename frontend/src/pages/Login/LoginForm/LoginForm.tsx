import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useLoginMutation } from '../../../api';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/InputFields/TextInput/TextInput';
import PasswordInput from '../../../components/InputFields/PasswordInput/PasswordInput';
import { ROUTES } from '../../routes';
import * as S from './LoginForm.styled';
import { clearMessage, setError } from '../../../stores/appSlice';
import { User } from '../../../types/user';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginUser, { isSuccess, error }] = useLoginMutation();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearMessage());
      history.push(ROUTES.ROOT);
    }
  }, [isSuccess, dispatch, history]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch]);

  const defaultValues = {
    username: '',
    password: '',
  };

  const {
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });

  const onSubmit = ({ username, password }: Pick<User, 'username' | 'password'>) => {
    const userPayload = {
      username,
      password,
    };

    loginUser(userPayload);
  };

  return (
    <S.Container>
      <S.HeaderText>Log in</S.HeaderText>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputRow>
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <TextInput
                error={Boolean(errors.username)}
                inputRef={ref}
                label="Username*"
                autoComplete="username"
                helperText={errors.username?.message}
                {...rest}
              />
            )}
          />
        </S.InputRow>
        <S.InputRow>
          <Controller
            name="password"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <PasswordInput
                error={Boolean(errors.password)}
                inputRef={ref}
                label="Password*"
                autoComplete="current-password"
                helperText={errors.password?.message}
                {...rest}
              />
            )}
          />
        </S.InputRow>

        <S.Spacer />

        <S.ButtonsContainer>
          <Button type="submit" disabled={!isDirty || !isValid}>
            Log In
          </Button>
          <Button onClick={() => history.push(ROUTES.REGISTER)}>Register</Button>
        </S.ButtonsContainer>
      </S.Form>
    </S.Container>
  );
};

export default LoginForm;

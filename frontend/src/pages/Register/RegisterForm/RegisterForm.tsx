import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import * as yup from 'yup';

import { useRegisterMutation } from '../../../api';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/InputFields/TextInput/TextInput';
import PasswordInput from '../../../components/InputFields/PasswordInput/PasswordInput';
import { clearMessage, setError, setSuccess } from '../../../stores/appSlice';
import { PasswordValidation } from '../PasswordValidation/PasswordValidation';
import { ROUTES } from '../../routes';
import * as S from './RegisterForm.styled';
import Select from '../../../components/InputFields/Select/Select';
import { Roles } from '../../../types/user';

export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

type RegisterFormData = {
  username: string;
  password: string;
  role: string;
};

const RegisterForm = () => {
  const defaultValues = {
    username: '',
    password: '',
    role: '',
  };

  const [registerUser, { isSuccess, isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSuccess('Account successfully created'));
      history.push(ROUTES.LOGIN);
    }
  }, [isSuccess, dispatch, history]);

  const onSubmit = (data: RegisterFormData) => {
    const user = {
      username: data.username,
      password: data.password,
      role: data.role,
    };
    dispatch(clearMessage());
    registerUser(user);
  };

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().matches(PASSWORD_PATTERN),
    role: yup.string().required(),
  });

  const {
    control,
    watch,
    formState: { isDirty, isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });
  const watchPassword = watch('password');

  return (
    <S.Container>
      <S.HeaderText>Enter your information</S.HeaderText>
      {!isSuccess && (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputRow>
            <Controller
              name="role"
              control={control}
              render={({ field: { ...rest } }) => (
                <Select
                  label="Role"
                  error={Boolean(errors.role)}
                  helperText={errors.role?.message}
                  {...omit(rest, 'ref')}
                >
                  <option value="" disabled></option>
                  <option value={Roles.Buyer}>{Roles.Buyer}</option>
                  <option value={Roles.Seller}>{Roles.Seller}</option>
                </Select>
              )}
            />
          </S.InputRow>

          <S.InputRow>
            <Controller
              name="username"
              control={control}
              render={({ field: { ...rest } }) => (
                <TextInput
                  error={Boolean(errors.username)}
                  label="Username*"
                  helperText={errors.username?.message}
                  {...omit(rest, 'ref')}
                />
              )}
            />
          </S.InputRow>

          <S.InputRow>
            <Controller
              name="password"
              control={control}
              render={({ field: { ...rest } }) => (
                <PasswordInput
                  error={Boolean(errors.password)}
                  label="Password*"
                  autoComplete="off"
                  {...omit(rest, 'ref')}
                />
              )}
            />
          </S.InputRow>

          <PasswordValidation password={watchPassword} />

          <S.Spacer />

          <Button type="submit" loading={isLoading} disabled={!isDirty || !isValid}>
            Next
          </Button>
        </S.Form>
      )}
    </S.Container>
  );
};

export default RegisterForm;

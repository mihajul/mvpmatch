import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { omit } from 'lodash';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

import * as S from './Profile.styled';
import DefaultPage from '../../layouts/DefaultLayout/DefaultLayout';
import MainTitle from '../../components/MainTitle/MainTitle';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../../api';
import FormError from '../../layouts/FormError/FormError';
import { User } from '../../types/user';
import { clearMessage, setError } from '../../stores/appSlice';
import TextInput from '../../components/InputFields/TextInput/TextInput';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/InputFields/PasswordInput/PasswordInput';
import { PasswordValidation } from '../Register/PasswordValidation/PasswordValidation';
import { ROUTES } from '../routes';
import { PASSWORD_PATTERN } from '../Register/RegisterForm/RegisterForm';

const Profile = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const history = useHistory();

  const defaultValues = {
    username: currentUser?.username,
    password: '',
  };

  const onSubmit = async (data: User) => {
    dispatch(clearMessage());
    await updateUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push(ROUTES.ROOT);
    }
  }, [isSuccess, dispatch, history]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch]);

  const schema = yup.object().shape({
    username: yup.string().min(3).required('Username is required'),
    password: yup.string().matches(PASSWORD_PATTERN),
  });

  const {
    control,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });
  const watchPassword = watch('password');

  return (
    <DefaultPage>
      <MainTitle>Profile</MainTitle>
      <S.ErrorWrapper>
        <FormError />
      </S.ErrorWrapper>
      <S.CardWrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputRow>
            <Controller
              name="username"
              control={control}
              render={({ field: { ...rest } }) => (
                <TextInput
                  error={Boolean(errors.username)}
                  label="Name*"
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
                  label="Password"
                  autoComplete="off"
                  {...omit(rest, 'ref')}
                />
              )}
            />
          </S.InputRow>

          <PasswordValidation password={watchPassword} />

          <S.Spacer />

          <Button type="submit" loading={isLoading} disabled={!isValid}>
            Save
          </Button>
        </S.Form>
      </S.CardWrapper>
    </DefaultPage>
  );
};
export default Profile;

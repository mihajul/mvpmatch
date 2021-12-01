import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { omit } from 'lodash';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

import * as S from './Deposit.styled';
import DefaultPage from '../../layouts/DefaultLayout/DefaultLayout';
import MainTitle from '../../components/MainTitle/MainTitle';
import FormError from '../../layouts/FormError/FormError';
import { clearMessage, setError, setSuccess } from '../../stores/appSlice';
import Select from '../../components/InputFields/Select/Select';
import Button from '../../components/Button/Button';
import { DepositRequest } from '../../types/user';
import { useDepositMutation, useGetCurrentUserQuery } from '../../api';
import { COINS } from '../../types/utils';

const Deposit = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const [desposit, { isLoading, error, isSuccess }] = useDepositMutation();

  const dispatch = useDispatch();
  const history = useHistory();

  const defaultValues = {
    coin: 5,
  };

  const onSubmit = async (data: DepositRequest) => {
    dispatch(clearMessage());
    await desposit(data);
  };

  useEffect(
    () => () => {
      dispatch(clearMessage());
    },
    [dispatch],
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSuccess('Deposited successfully'));
    }
  }, [isSuccess, dispatch, history]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch]);

  const schema = yup.object().shape({
    coin: yup.number().required(),
  });

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });

  return (
    <DefaultPage>
      <MainTitle>Deposit</MainTitle>
      <S.ErrorWrapper>
        <FormError />
      </S.ErrorWrapper>
      <S.CardWrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputRow>
            <Controller
              name="coin"
              control={control}
              render={({ field: { ...rest } }) => (
                <Select
                  label="Coin"
                  error={Boolean(errors.coin)}
                  helperText={errors.coin?.message}
                  {...omit(rest, 'ref')}
                >
                  {COINS.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              )}
            />
          </S.InputRow>

          <S.Spacer />

          <Button type="submit" loading={isLoading} disabled={!isValid}>
            Deposit
          </Button>

          <S.Spacer />

          <S.Amount>Total deposited: {currentUser?.deposit}</S.Amount>
        </S.Form>
      </S.CardWrapper>
    </DefaultPage>
  );
};
export default Deposit;

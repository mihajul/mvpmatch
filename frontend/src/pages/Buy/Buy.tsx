import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { omit } from 'lodash';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import * as S from './Buy.styled';
import DefaultPage from '../../layouts/DefaultLayout/DefaultLayout';
import MainTitle from '../../components/MainTitle/MainTitle';
import FormError from '../../layouts/FormError/FormError';
import { clearMessage, setError } from '../../stores/appSlice';
import Button from '../../components/Button/Button';
import { BuyRequest } from '../../types/user';
import { useBuyMutation, useGetCurrentUserQuery, useGetProductQuery } from '../../api';
import TextInput from '../../components/InputFields/TextInput/TextInput';
import { COINS } from '../../types/utils';

const Buy = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: product } = useGetProductQuery(productId ?? skipToken);
  const [buy, { data: buyResponse, isLoading, error, isSuccess }] = useBuyMutation();

  const dispatch = useDispatch();

  const defaultValues = {
    numberOfProducts: 1,
  };

  const onSubmit = async (data: BuyRequest) => {
    dispatch(clearMessage());
    await buy({ ...data, productId });
  };

  useEffect(
    () => () => {
      dispatch(clearMessage());
    },
    [dispatch],
  );

  useEffect(() => {
    console.log(buyResponse);
  }, [buyResponse]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch]);

  const schema = yup.object().shape({
    numberOfProducts: yup.number().integer().min(1).required(),
  });

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });

  return (
    <DefaultPage>
      <MainTitle>Buy</MainTitle>
      <S.ErrorWrapper>
        <FormError />
      </S.ErrorWrapper>
      <S.CardWrapper>
        <S.InputRow>Product name: {product?.productName}</S.InputRow>
        <S.InputRow>Product cost: {product?.cost}</S.InputRow>
        {isSuccess && buyResponse && (
          <>
            <S.InputRow>Spent: {buyResponse?.spent}</S.InputRow>
            <S.InputRow>Change:</S.InputRow>
            <S.InputRow>
              <S.ChangeContainer>
                {(buyResponse?.coins).map(
                  (value, index) =>
                    value > 0 && (
                      <S.Change key={value}>
                        {value} x {COINS[index]} cents
                      </S.Change>
                    ),
                )}
              </S.ChangeContainer>
            </S.InputRow>
          </>
        )}
        {!isSuccess && (
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.InputRow>User Deposit: {currentUser?.deposit}</S.InputRow>

            <S.InputRow>
              <Controller
                name="numberOfProducts"
                control={control}
                render={({ field: { ...rest } }) => (
                  <TextInput
                    type="number"
                    error={Boolean(errors.numberOfProducts)}
                    label="Number of products*"
                    helperText={errors.numberOfProducts?.message}
                    {...omit(rest, 'ref')}
                  />
                )}
              />
            </S.InputRow>

            <S.Spacer />

            <Button type="submit" loading={isLoading} disabled={!isValid}>
              Buy
            </Button>
          </S.Form>
        )}
      </S.CardWrapper>
    </DefaultPage>
  );
};
export default Buy;

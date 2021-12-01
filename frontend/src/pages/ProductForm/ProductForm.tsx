import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { omit } from 'lodash';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import * as S from './ProductForm.styled';
import DefaultPage from '../../layouts/DefaultLayout/DefaultLayout';
import MainTitle from '../../components/MainTitle/MainTitle';
import { useAddProductMutation, useGetProductQuery, useUpdateProductMutation } from '../../api';
import FormError from '../../layouts/FormError/FormError';
import { clearMessage, setError } from '../../stores/appSlice';
import TextInput from '../../components/InputFields/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { ROUTES } from '../routes';
import { Product } from '../../types/product';

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductQuery(id ?? skipToken);
  const [addProduct, addProductStatus] = useAddProductMutation();
  const [updateProduct, updateProductStatus] = useUpdateProductMutation();

  const dispatch = useDispatch();
  const history = useHistory();

  const defaultValues = {
    productName: '',
    amountAvailable: '',
    cost: '',
  };

  const onSubmit = (data: Product) => {
    dispatch(clearMessage());
    if (id) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
  };

  useEffect(() => {
    if (addProductStatus.isSuccess || updateProductStatus.isSuccess) {
      history.push(ROUTES.ROOT);
    }
  }, [addProductStatus.isSuccess, updateProductStatus.isSuccess, history]);

  useEffect(() => {
    if (addProductStatus.error || updateProductStatus.error) {
      dispatch(setError(addProductStatus.error ?? updateProductStatus.error));
    }
  }, [addProductStatus.error, updateProductStatus.error, dispatch]);

  const schema = yup.object().shape({
    cost: yup
      .number()
      .min(5)
      .required()
      .test('validPrice', 'must be divisible by 5', (value) => value !== undefined && value % 5 === 0),
    productName: yup.string().min(3).required(),
    amountAvailable: yup.number().min(1).required(),
  });

  const {
    control,
    reset,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues });

  useEffect(() => {
    if (id && product) {
      reset(product);
    }
  }, [id, product, reset]);

  return (
    <DefaultPage>
      <MainTitle>{id ? 'Edit' : 'Add'} product</MainTitle>
      <S.ErrorWrapper>
        <FormError />
      </S.ErrorWrapper>
      <S.CardWrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputRow>
            <Controller
              name="productName"
              control={control}
              render={({ field: { ...rest } }) => (
                <TextInput
                  error={Boolean(errors.productName)}
                  label="Name*"
                  helperText={errors.productName?.message}
                  {...omit(rest, 'ref')}
                />
              )}
            />
          </S.InputRow>

          <S.InputRow>
            <Controller
              name="cost"
              control={control}
              render={({ field: { ...rest } }) => (
                <TextInput
                  type="number"
                  error={Boolean(errors.cost)}
                  helperText={errors.cost?.message}
                  label="Cost"
                  autoComplete="off"
                  {...omit(rest, 'ref')}
                />
              )}
            />
          </S.InputRow>

          <S.InputRow>
            <Controller
              name="amountAvailable"
              control={control}
              render={({ field: { ...rest } }) => (
                <TextInput
                  type="number"
                  error={Boolean(errors.amountAvailable)}
                  helperText={errors.amountAvailable?.message}
                  label="Amount"
                  autoComplete="off"
                  {...omit(rest, 'ref')}
                />
              )}
            />
          </S.InputRow>

          <S.Spacer />

          <Button
            type="submit"
            loading={addProductStatus.isLoading || updateProductStatus.isLoading}
            disabled={!isValid}
          >
            Save
          </Button>
        </S.Form>
      </S.CardWrapper>
    </DefaultPage>
  );
};
export default ProductForm;

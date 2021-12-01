import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './apiBase';
import { TagTypes } from './apiBase.types';
import getAuthEndpoints from './endpoints/auth';
import getUserEndpoints from './endpoints/user';
import getProductEndpoints from './endpoints/product';

export const API = createApi({
  reducerPath: 'API',
  baseQuery,
  tagTypes: [TagTypes.CurrentSession, TagTypes.CurrentUser, TagTypes.Product],
  endpoints: (builder) => ({
    ...getAuthEndpoints(builder),
    ...getUserEndpoints(builder),
    ...getProductEndpoints(builder),
  }),
});

export const {
  useCurrentSessionQuery,
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBuyMutation,
  useDepositMutation,
  useResetMutation,
  useLogoutAllMutation,
} = API;

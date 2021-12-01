import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { BuyRequest, BuyResponse, DepositRequest, User } from '../../types/user';
import { BaseQuery, Response, TagTypes } from '../apiBase.types';

const getUserEndpoints = (builder: EndpointBuilder<BaseQuery, TagTypes, 'API'>) => ({
  getCurrentUser: builder.query<User, void>({
    query: () => ({
      url: 'users/me',
      method: 'GET',
    }),
    providesTags: [TagTypes.CurrentUser],
    transformResponse: (response: Response<User>): User => response.data,
  }),
  updateUser: builder.mutation<Response<void>, Partial<User>>({
    query: (data) => ({
      url: 'users/me',
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: [TagTypes.CurrentUser],
  }),
  deposit: builder.mutation<Response<void>, DepositRequest>({
    query: (data) => ({
      url: 'users/deposit',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [TagTypes.CurrentUser],
  }),
  buy: builder.mutation<BuyResponse, BuyRequest>({
    query: (data) => ({
      url: 'users/buy',
      method: 'POST',
      body: data,
    }),
    transformResponse: (response: Response<BuyResponse>): BuyResponse => response.data,
    invalidatesTags: [TagTypes.CurrentUser],
  }),
  reset: builder.mutation<Response<void>, void>({
    query: () => ({
      url: 'users/reset',
      method: 'POST',
    }),
    invalidatesTags: [TagTypes.CurrentUser],
  }),
});

export default getUserEndpoints;

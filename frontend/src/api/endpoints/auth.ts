import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { BaseQuery, Response, CurrentSessionData, TagTypes } from '../apiBase.types';
import { LoginRequest, RegisterRequest, User } from '../../types/user';

const getAuthEndpoints = (builder: EndpointBuilder<BaseQuery, TagTypes, 'API'>) => ({
  login: builder.mutation<Response<Pick<User, 'id'>>, LoginRequest>({
    query: (data: LoginRequest) => ({
      url: 'sessions',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [TagTypes.CurrentSession, TagTypes.CurrentUser],
  }),
  register: builder.mutation<Response<Pick<User, 'id'>>, RegisterRequest>({
    query: (data: RegisterRequest) => ({
      url: 'users',
      method: 'POST',
      body: data,
    }),
  }),
  logout: builder.mutation<Response<Pick<User, 'id'>>, void>({
    query: () => ({
      url: 'sessions/current',
      method: 'DELETE',
    }),
    invalidatesTags: [TagTypes.CurrentSession, TagTypes.CurrentUser],
  }),
  logoutAll: builder.mutation<Response<Pick<User, 'id'>>, void>({
    query: () => ({
      url: 'sessions/all',
      method: 'DELETE',
    }),
    invalidatesTags: [TagTypes.CurrentSession],
  }),
  currentSession: builder.query<CurrentSessionData, void>({
    query: () => ({
      url: 'sessions/current',
      method: 'GET',
    }),
    providesTags: [TagTypes.CurrentSession],
    transformResponse: (response: Response<CurrentSessionData>): CurrentSessionData => response.data,
  }),
});

export default getAuthEndpoints;

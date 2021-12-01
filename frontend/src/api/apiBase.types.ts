import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query';

export type Response<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type ErrorResponse<T> = {
  error: {
    data: T[];
  };
};

export type LoginResponse = {
  id: number;
};

export type CurrentSessionData = {
  isLoggedIn: boolean;
  sessions: number;
};

export enum TagTypes {
  CurrentSession = 'CurrentSession',
  CurrentUser = 'CurrentUser',
  Product = 'Product',
}

export type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, unknown>;

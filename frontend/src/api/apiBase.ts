/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery, Response } from './apiBase.types';

const DEFAULT_ERROR_MESSAGE = `Server error`;
const NETWORK_ERROR_MESSAGE = `Network problem - cannot contact server`;

export type QueryError = {
  message: string;
};

const baseFetchQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
  credentials: 'include',
});

export const baseQuery: BaseQuery = async (args, api, extraOptions) => {
  let response;
  try {
    response = await baseFetchQuery(args, api, extraOptions);
  } catch (queryError) {
    const err = queryError as QueryError;

    return { error: err.message };
  }

  if (response.error) {
    let errorMessage = '';

    if (response.error.status === 'FETCH_ERROR') {
      errorMessage = NETWORK_ERROR_MESSAGE;
    } else if (response.error.status === 'PARSING_ERROR' || response.error.status === 'CUSTOM_ERROR') {
      errorMessage = DEFAULT_ERROR_MESSAGE;
    } else {
      errorMessage = (response.error.data as Response<any>).message || DEFAULT_ERROR_MESSAGE;
    }

    return { error: errorMessage };
  }
  return response;
};

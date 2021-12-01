import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { pick } from 'lodash';

import { Product } from '../../types/product';
import { BaseQuery, Response, TagTypes } from '../apiBase.types';

const getProductEndpoints = (builder: EndpointBuilder<BaseQuery, TagTypes, 'API'>) => ({
  getProducts: builder.query<Product[], string | undefined>({
    query: (userId) => ({
      url: userId === undefined ? 'products' : `products/users/${userId}`,
      method: 'GET',
    }),
    providesTags: [TagTypes.Product],
    transformResponse: (response: Response<Product[]>): Product[] => response.data,
  }),
  getProduct: builder.query<Product, string>({
    query: (id) => ({
      url: `products/${id}`,
      method: 'GET',
    }),
    providesTags: [TagTypes.Product],
    transformResponse: (response: Response<Product>): Product => response.data,
  }),
  addProduct: builder.mutation<Response<void>, Omit<Product, 'id'>>({
    query: (data) => ({
      url: 'products',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [TagTypes.Product],
  }),
  updateProduct: builder.mutation<Response<void>, Product>({
    query: (data) => ({
      url: `products/${data.id}`,
      method: 'PUT',
      body: pick(data, 'productName', 'cost', 'amountAvailable'),
    }),
    invalidatesTags: [TagTypes.Product],
  }),
  deleteProduct: builder.mutation<Response<void>, string>({
    query: (id) => ({
      url: `products/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: [TagTypes.Product],
  }),
});

export default getProductEndpoints;

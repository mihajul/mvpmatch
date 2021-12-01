import { Product } from './product';

export type User = {
  id: string;
  username: string;
  password: string;
  role: string;
  deposit?: number;
};

export type LoginRequest = Pick<User, 'username' | 'password'>;

export type RegisterRequest = Omit<User, 'id'>;

export enum Roles {
  Buyer = 'buyer',
  Seller = 'seller',
}

export type DepositRequest = {
  coin: number;
};

export type BuyRequest = {
  productId: string;
  numberOfProducts: number;
};

export type BuyResponse = {
  product: Product;
  numberOfProducts: number;
  spent: number;
  coins: number[];
};

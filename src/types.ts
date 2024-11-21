export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product: string;
  quantity: number;
  order_value: number;
}

export interface User {
  email: string;
  email_verified: boolean;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
}

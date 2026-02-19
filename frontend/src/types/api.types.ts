/**
 * API Types
 */

export interface Sandwich {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  sandwich_id: number;
  sandwich?: Sandwich;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  status: OrderStatus;
  customer_phone_number?: string;
}

export enum OrderStatus {
  OPEN = 'OPEN',
  SUBMITTED = 'SUBMITTED',
  FULFILLED = 'FULFILLED',
}

export interface OrderItemInput {
  sandwich_id: number;
  quantity: number;
}

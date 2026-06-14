export type OrderStatus = 'pending' | 'delivered';

export interface Order {
  id: string;
  client: string;
  product: string;
  quantity: number;
  status: OrderStatus;
  timestamp: string;
}

export type NewOrder = Omit<Order, 'id' | 'timestamp' | 'status'>;
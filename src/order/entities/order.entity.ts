import { Product } from '../../product/entities/product.entity';
import { Variant } from '../../variant/entities/variant.entity';

export class Order {
  id: number;
  referenceId: string;
  status: OrderStatus;
  items: OrderItems[];
  totalAmount: number;
}

export class OrderItems {
  id: number;
  referenceId: string;
  amount: number;
  product: Product;
  variant: Variant;
  order: Order;
}

export class OrderStatus {
  id: number;
  description: string;
}

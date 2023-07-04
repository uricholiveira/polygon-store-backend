import { OrderItems, OrderStatus } from '../entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { Variant } from '../../variant/entities/variant.entity';

export class CreateOrderDto {
  referenceId: string;
  items: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  referenceId: string;
  quantity: number;
  amount: number;
  product: Product;
  variant: Variant;
}

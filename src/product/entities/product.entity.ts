import { Category } from '../../category/entities/category.entity';
import { Variant } from '../../variant/entities/variant.entity';

export class Product {
  id: number;
  description: string;
  imageUrl: string;
  categories?: Category[];
  variants?: Variant[];
}

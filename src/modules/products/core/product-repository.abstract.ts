import { ProductEntity } from './product.entity';
import { Repository } from '@shared/core/repository';

export abstract class IProductRepository extends Repository<ProductEntity> {}

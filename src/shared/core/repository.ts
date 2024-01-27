import { Entity } from './entity';

export abstract class Repository<TEntity extends Entity> {
  abstract create(data: TEntity);
  abstract findAll();
  abstract findOne(filter: string, options?: any): Promise<TEntity>;
  abstract update?(id: string, data: TEntity);
  abstract remove?(id: string);
}

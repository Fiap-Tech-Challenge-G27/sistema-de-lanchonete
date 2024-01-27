import { Repository } from '@shared/core/repository';
import { CustomerEntity } from './customer.entity';

export abstract class ICustomerRepository extends Repository<CustomerEntity> {}

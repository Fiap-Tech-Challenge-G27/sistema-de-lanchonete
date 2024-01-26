import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  IExceptionService,
  IExceptionBody,
} from 'src/shared/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IExceptionService {
  forbiddenException(data?: IExceptionBody): void {
    throw new ForbiddenException(data);
  }
  notFoundException(data?: IExceptionBody): void {
    throw new NotFoundException(data);
  }
  internalServerErrorException(data?: IExceptionBody): void {
    throw new InternalServerErrorException(data);
  }
  badRequestException(expBody: IExceptionBody) {
    throw new BadRequestException(expBody);
  }
}

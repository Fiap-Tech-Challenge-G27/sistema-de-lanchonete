export interface IExceptionBody {
  message: string;
  code?: number;
}

export interface IExceptionService {
  badRequestException(data: IExceptionBody): void;
  forbiddenException(data?: IExceptionBody): void;
  notFoundException(data?: IExceptionBody): void;
  internalServerErrorException(data?: IExceptionBody): void;
}

export const IExceptionService = Symbol('IExceptionService');

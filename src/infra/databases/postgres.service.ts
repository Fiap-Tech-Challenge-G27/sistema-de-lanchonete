import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class PostgresConfigServiceService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: this.configService.get('TYPEORM_CONNECTION'),
      url: this.configService.get('TYPEORM_URL'),
      entities: [__dirname + '/../../**/*.model.{js,ts}'],
      synchronize: true,
    };
  }
}

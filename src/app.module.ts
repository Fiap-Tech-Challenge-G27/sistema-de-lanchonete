import { Module } from '@nestjs/common';
import { AppService } from './domain/app.service';
import { AppController } from './driver/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get } from '@nestjs/common';
import { AppService } from '@domain/app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }
}

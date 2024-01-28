import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseUUIDPipe,
  } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    healthCheck() {
        return ""
    }
}
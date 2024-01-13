import { Test, TestingModule } from '@nestjs/testing';
import { PostgresConfigServiceService } from './postgres.service';

describe('PostgresConfigServiceService', () => {
  let service: PostgresConfigServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresConfigServiceService],
    }).compile();

    service = module.get<PostgresConfigServiceService>(
      PostgresConfigServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

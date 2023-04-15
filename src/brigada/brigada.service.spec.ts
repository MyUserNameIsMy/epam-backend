import { Test, TestingModule } from '@nestjs/testing';
import { BrigadaService } from './brigada.service';

describe('BrigadaService', () => {
  let service: BrigadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrigadaService],
    }).compile();

    service = module.get<BrigadaService>(BrigadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

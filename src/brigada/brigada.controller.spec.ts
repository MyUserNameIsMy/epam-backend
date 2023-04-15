import { Test, TestingModule } from '@nestjs/testing';
import { BrigadaController } from './brigada.controller';
import { BrigadaService } from './brigada.service';

describe('BrigadaController', () => {
  let controller: BrigadaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrigadaController],
      providers: [BrigadaService],
    }).compile();

    controller = module.get<BrigadaController>(BrigadaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

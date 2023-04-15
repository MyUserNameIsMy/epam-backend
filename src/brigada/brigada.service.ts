import { Injectable } from '@nestjs/common';
import { CreateBrigadaDto } from './dto/create-brigada.dto';
import { UpdateBrigadaDto } from './dto/update-brigada.dto';
import { BrigadaEntity } from './entities/brigada.entity';

@Injectable()
export class BrigadaService {
  create(createBrigadaDto: CreateBrigadaDto) {
    return 'This action adds a new brigada';
  }

  findAll() {
    return BrigadaEntity.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} brigada`;
  }

  update(id: number, updateBrigadaDto: UpdateBrigadaDto) {
    return `This action updates a #${id} brigada`;
  }

  remove(id: number) {
    return `This action removes a #${id} brigada`;
  }
}

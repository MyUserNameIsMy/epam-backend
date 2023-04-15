import { Module } from '@nestjs/common';
import { BrigadaService } from './brigada.service';
import { BrigadaController } from './brigada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrigadaEntity } from './entities/brigada.entity';
import { MemberEntity } from './entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrigadaEntity, MemberEntity])],
  controllers: [BrigadaController],
  providers: [BrigadaService],
})
export class BrigadaModule {}

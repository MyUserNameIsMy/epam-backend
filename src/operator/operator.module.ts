import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatorEntity } from './entities/operator.entity';
import { ApplicationPullEntity } from './entities/application-pull.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperatorEntity, ApplicationPullEntity])],
  controllers: [OperatorController],
  providers: [OperatorService],
})
export class OperatorModule {}

import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationEntity } from './entities/application.entity';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';

@Injectable()
export class ApplicationService {
  async getApplicationByStatus(
    status: ApplicationStatusEnum,
  ): Promise<ApplicationEntity[]> {
    return await ApplicationEntity.find({
      where: { status: status },
    });
  }

  async getApplicationByStatusForClient(
    client_id: number,
    status: ApplicationStatusEnum,
  ): Promise<ApplicationEntity[]> {
    return await ApplicationEntity.find({
      where: {
        client: {
          id: client_id,
        },
        status: status,
      },
    });
  }

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationEntity> {
    const application = new ApplicationEntity();
    Object.assign(application, createApplicationDto);
    return await application.save();
  }
}

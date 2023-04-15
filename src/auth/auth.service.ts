import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientEntity } from '../client/entities/client.entity';
import { OperatorModule } from '../operator/operator.module';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { BrigadaEntity } from '../brigada/entities/brigada.entity';
import { compare } from 'bcrypt';
import { UserRoleEnum } from './enum/user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterOperatorDto } from './dto/register-operator.dto';
import { RegisterClientDto } from './dto/register-client.dto';
import { RegisterBrigadaDto } from './dto/register-brigada.dto';
import { MemberEntity } from '../brigada/entities/member.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validate(username: string, password: string) {
    const client = await ClientEntity.findOne({
      where: {
        email: username,
      },
      select: ['id', 'password', 'firstname', 'lastname'],
    });

    const operator = await OperatorEntity.findOne({
      where: {
        email: username,
      },
      select: ['id', 'password', 'firstname', 'lastname'],
    });

    const brigada = await BrigadaEntity.findOne({
      where: {
        team_name: username,
      },
      select: ['id', 'password', 'team_name'],
    });

    if (client && (await compare(password, client.password))) {
      Object.assign(client, { role: UserRoleEnum.CLIENT });
      return client;
    }
    if (operator && (await compare(password, operator.password))) {
      Object.assign(operator, { role: UserRoleEnum.OPERATOR });
      return operator;
    }
    if (brigada && (await compare(password, brigada.password))) {
      Object.assign(brigada, { role: UserRoleEnum.BRIGADA });
      return brigada;
    }

    throw new UnauthorizedException('Login or Password is incorrect');
  }

  async registerOperator(
    operatorDto: RegisterOperatorDto,
  ): Promise<OperatorEntity> {
    const operator = new OperatorEntity();
    Object.assign(operator, operatorDto);
    return await operator.save();
  }

  async registerClient(clientDto: RegisterClientDto): Promise<ClientEntity> {
    const client = new ClientEntity();
    Object.assign(client, clientDto);
    return await client.save();
  }

  async registerBrigada(
    brigadaDto: RegisterBrigadaDto,
  ): Promise<BrigadaEntity> {
    const brigada = new BrigadaEntity();

    const members = brigadaDto.members.map((item) => {
      const member = new MemberEntity();
      Object.assign(member, item);
      return member;
    });
    await MemberEntity.save(members);

    brigada.team_name = brigadaDto.team_name;
    brigada.password = brigadaDto.password;
    brigada.members = members;

    return await brigada.save();
  }

  async generateToken(user: any): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(
        {
          role: user.role,
          sub: user.id,
        },
        {
          expiresIn: '3d',
        },
      ),
    };
  }
}

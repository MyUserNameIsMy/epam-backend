import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../shared/config/jwt.config';
import { JwtUserStrategy } from './strategy/jwt-user.strategy';
import { UserStrategy } from './strategy/user.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/entities/client.entity';
import { BrigadaEntity } from '../brigada/entities/brigada.entity';
import { OperatorEntity } from '../operator/entities/operator.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([ClientEntity, BrigadaEntity, OperatorEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUserStrategy, UserStrategy, AuthService],
})
export class AuthModule {}

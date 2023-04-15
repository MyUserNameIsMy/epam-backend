import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { use } from 'passport';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'client') {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: false });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validate(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

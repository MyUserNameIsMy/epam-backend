import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from '../../shared/config/app.config';

export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-client') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().appSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

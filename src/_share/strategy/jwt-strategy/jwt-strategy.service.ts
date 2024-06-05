/* eslint-disable prettier/prettier */
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Types } from 'mongoose';

import { UserProxyService } from 'src/_share/user-proxy/user-proxy.service';
// import { BknusersService } from 'src/_bknusers/bknusers.service';
// import { JwtPayloadDto } from '../../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private configSrvc: ConfigService,
    private readonly _proxyMicroservice: UserProxyService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configSrvc.get('auth.secret'),
    });
  }

  async validate({ id }: Types.ObjectId) {
    console.log('id', id);
    const user:any = await this._proxyMicroservice.populateUserProxy(id.toString() , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");

    console.log('user validating guard', user._id);
    if (!user) {
      // return user;
      throw new ConflictException("MICROSERVISE CONFLICT");
      
      // throw new UnauthorizedException();
    }
    user.password = undefined;
    console.log('is a valid token !');
    return user;
  }
}

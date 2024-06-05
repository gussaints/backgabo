/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//SERVICES
import { UserProxyService } from './user-proxy/user-proxy.service';
import { PopulateUserService } from './populate/populate-user/populate-user.service';
// SOCKETS
import { EventsGateway } from './gateway/gateway';
// MODULES
// import { NotifyModule } from 'src/_notify/notify.module';
// TOKEN
import { JwtStrategyService } from './strategy/jwt-strategy/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalProxyService } from './local-proxy/proyectmanager-proxy.service';
import { FE_ProxyService } from './local-proxy/FE_cygnus-proxy.service';
@Module({
  imports:[
    // NotifyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configSrvc: ConfigService) => {
        return {
          secret: configSrvc.get('auth.secret'),
          //signOptions: { expiresIn: 100 },
          signOptions: { expiresIn: '3600s'}
          // signOptions: { expiresIn: '10h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    // UserProxyService, 
    // FE_ProxyService,
    // // LocalProxyService,
    // PopulateUserService,
    EventsGateway,
    JwtStrategyService
  ],
  exports:[
    // UserProxyService,
    // FE_ProxyService,
    // PopulateUserService,
    EventsGateway
  ]
})
export class ShareModule {}

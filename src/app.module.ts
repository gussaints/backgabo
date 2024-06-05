/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

// VALIDATION
import { validate } from './env.validation';

// CONFIG
require('dotenv').config();
import * as os from 'os';
const networkInterfaces = os.networkInterfaces( );
import configMongo from './config/configuration';
import configAuth from './config/configuration-auth';

// MODULES
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';
// import { ShareModule } from './_share/share.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      load: [configMongo, configAuth],
      isGlobal: true,
      expandVariables: true,
    }),
    HttpModule,
    MongoConnectionModule,
    // -----------------------
    
    // -----------------------
    
    // MicroserviceConnectionModule
  ], 
  controllers: [],
  providers: [
    // EventsGateway,
    // MicroserviceConnectionService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [
    // ShareModule, 
    // EventsGateway
  ],
})
export class AppModule {
  // static port              : number;
  // static wsportusers       : number;
  static serverIP          : string;
  // static user_microservice : number;
  // static database          : string;
  // static host              : string;
  // static microsrvcport     : string;
  // static bknPath           : string;
  // static dbPort            : string;
  // static foxcode_port      : string;

  static DB_HOST             : string;
  static DB_PORT             : number;
  static DB_USER             : string;
  static DB_PASSWORD         : string;
  static DB_USAGE            : string;
  static RUNNIN_PORT         : number;
  static RUNNIN_PATH         : string;
  static JWT_SEED            : string;
  static MICROSERVICE_PORT   : number;
  static USER_MICROSERVICE   : number;
  static microsrvcport: any;

  constructor(private readonly configService: ConfigService) {
    // AppModule.port              = this.configService.get('mongo.port');
    // AppModule.wsportusers       = this.configService.get('mongo.wsportusers');
    // AppModule.database          = this.configService.get('mongo.database');
    // AppModule.host              = this.configService.get('mongo.host');
    // AppModule.microsrvcport     = this.configService.get('mongo.microsrvcport');
    // AppModule.bknPath           = this.configService.get('mongo.bknPath');
    // AppModule.dbPort            = this.configService.get('mongo.dbport');
    // AppModule.user_microservice = this.configService.get('mongo.user_microservice');
    // AppModule.foxcode_port      = this.configService.get('mongo.foxcode_port');


    AppModule.DB_HOST             = this.configService.get('DB_HOST');
    AppModule.DB_PORT             = this.configService.get('DB_PORT');
    AppModule.DB_USER             = this.configService.get('DB_USER');
    AppModule.DB_PASSWORD         = this.configService.get('DB_PASSWORD');
    AppModule.DB_USAGE            = this.configService.get('DB_USAGE');
    AppModule.RUNNIN_PORT         = this.configService.get('RUNNIN_PORT');
    AppModule.RUNNIN_PATH         = this.configService.get('RUNNIN_PATH');
    AppModule.JWT_SEED            = this.configService.get('JWT_SEED');
    AppModule.MICROSERVICE_PORT   = this.configService.get('MICROSERVICE_PORT');
    AppModule.USER_MICROSERVICE   = this.configService.get('USER_MICROSERVICE');
    AppModule.serverIP            = networkInterfaces.eno1[ 0 ].address; 
  }
}

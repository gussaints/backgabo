/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { server_ip } from '../common/microservices.constants';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MicroserviceConnectionService {

    // Add clients as much as needed
    private userMicroservice: ClientProxy;

     constructor ( 

         private loggerService: LoggerService,
         private readonly configService: ConfigService

    ) {
        // console.log("mongo user microservice");
        // console.log(this.configService.get( 'mongo.user_microservice' ));
        
        this.connect_microservice( server_ip, 'userMicroservice', this.configService.get( 'mongo.user_microservice' ) );

    }

    private async connect_microservice ( host: string, client: string, port: number  ) {
    
        console.log("conection try...");
        this[ client ] = ClientProxyFactory.create( { transport: Transport.TCP, options: { host, port } } );

        try {
            
            await this[ client ].connect( );
            this.loggerService.log( JSON.stringify( { method: 'TCP', payload:`Connected to ${ client } on port ${ port }` } ) );

        } catch ( error ) {

            const payload = { type: 'MICROSERVICE Connect', response:`${ error } ${ client }`, user:'backend', api:'n/a' };
            this.loggerService.error( JSON.stringify( payload ) );
            
        }

   };

   // Get a microservice conection 
   public getClient( client: string ): ClientProxy {

        return this[ client ];

   };
  
}

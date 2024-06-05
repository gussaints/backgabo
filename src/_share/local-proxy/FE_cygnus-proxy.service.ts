/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
require('dotenv').config();
import * as os from 'os';
import { ConfigService } from '@nestjs/config';
const networkInterfaces = os.networkInterfaces( );
@Injectable()
export class FE_ProxyService {
  constructor(private readonly configService: ConfigService) {
    this.testConnection();
  }


  ///////////////////////////////////////////////////////////////////////////////////
  //                          CONECTION TEST
  ///////////////////////////////////////////////////////////////////////////////////
  private async testConnection(): Promise<void> {
    const port = this.configService.get<number>('mongo.fe_microservice');
    const client = ClientProxyFactory.create({ 
      transport: Transport.TCP, 
      options: { host: "localhost", port: port } 
    });

    try {
      await client.connect();
      console.log(`Connected to FE${port == 3015 ? "_DEV":"_PROD"} `);
      client.close(); // Cerramos la conexión una vez probada
    } catch (error) {
      console.log(`Error connecting to local microservice on port ${port}: ${error.message}`);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////
  //                          GET BY ID
  ///////////////////////////////////////////////////////////////////////////////////
  async fe_cygnusProxy(workflowData):Promise<any>{
    return new Promise(async (resolve, reject)=>{
      try {
        
        const response: any = await lastValueFrom(
          ClientProxyFactory.create({ 
          transport: Transport.TCP, 
              options: { 
                  host: "localhost", 
                  port: this.configService.get('mongo.fe_microservice') 
              } 
          })
          .send<string, any>('FE-WORKFLOW-CreateWorkflowByCygnus', workflowData)
      );
        resolve(response);
      } catch (error) {
        reject(error)
      }
    });
  }

  







} // end class
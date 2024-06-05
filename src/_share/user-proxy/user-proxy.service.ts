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
export class UserProxyService {
  constructor(private readonly configService: ConfigService) {
    this.testConnection();
  }


  ///////////////////////////////////////////////////////////////////////////////////
  //                          CONECTION TEST
  ///////////////////////////////////////////////////////////////////////////////////
  private async testConnection(): Promise<void> {
    const port = this.configService.get<number>('mongo.user_microservice');
    const client = ClientProxyFactory.create({ 
      transport: Transport.TCP, 
      options: { host: "localhost", port: port } 
    });

    try {
      await client.connect();
      console.log(`Connected to USER${port == 3011 ? "_DEV":"_PROD"} `);
      client.close(); // Cerramos la conexión una vez probada
    } catch (error) {
      console.log(`Error connecting to user microservice on port ${port}: ${error.message}`);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////
  //                          GET USER BY ID
  ///////////////////////////////////////////////////////////////////////////////////
  async populateUserProxy(id: string, param: string, microname: string): Promise<any> {
    const response: any = await lastValueFrom(
        ClientProxyFactory.create({ 
        transport: Transport.TCP, 
            options: { 
                host: "localhost", 
                port: this.configService.get('mongo.user_microservice') 
            } 
        })
        .send<string, any>(microname, {
        val: id,  // Aquí usamos el parámetro id en lugar del payload.idUser
        param: param, // Utilizamos el parámetro directamente
        })
    );
    response.password = null;
    return response;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  //                          UPDATE USER BY NOTIFY
  ///////////////////////////////////////////////////////////////////////////////////
  async updateUserByNotify(idNoty, rol, buName):Promise<any>{
    return new Promise(async (resolve, reject)=>{
      try {
        
        const response: any = await lastValueFrom(
          ClientProxyFactory.create({ 
          transport: Transport.TCP, 
              options: { 
                  host: "localhost", 
                  port: this.configService.get('mongo.user_microservice') 
              } 
          })
          .send<string, any>('updating-users-notify', {
            idNoty, 
            buName, 
            rol, 
          })
      );
        resolve(response);
      } catch (error) {
        reject(error)
      }
    });
  }
  async testmicroservice():Promise<boolean>{
    return new Promise(async(resolve, reject)=>{
      try {
        resolve(true)
      } catch (error) {
        reject(error)
      }
    });
  }
  







} // end class
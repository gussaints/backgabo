/* eslint-disable prettier/prettier */
// events.gateway.ts

import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket as IOSocket, Server } from 'socket.io';
import { io, Socket as ClientSocket } from 'socket.io-client';
import { ConfigService } from '@nestjs/config';


// import * as service from 'src/_notify/service';

import * as events from 'src/common/global/notifyArr';
// import { UserProxyService } from '../user-proxy/user-proxy.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})  // Puedes especificar un puerto, ej.: @WebSocketGateway(8080)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly configService       : ConfigService,
    // private readonly _UserProxyService   : UserProxyService,
    // private readonly _notifyService      : service.NotifyService,
    // private readonly _NotifySaverService : service.NotifySaverService,
  ) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  // private FE_Backend_Socket: ClientSocket;
  // private USER_Backend_Socket: ClientSocket;
  // private FEEvents     = ['FE_TICKETS_TEST', "FE_TICKETS_GETTICKETS"];
  // private USEREvents   = ['FOXCODE V2 USER create_newOne'];
  // private clientEvents = ['Read_user', 'User', 'Admin', 'Super', "Dev"];
  afterInit(server: Server) {
    this.logger.log('Initialized!');

    // this.FE_Backend_Socket   = io(`http://10.19.16.22:${this.configService.get('mongo.database').includes("_DEV") ? "3014":"3016" }`);
    // this.USER_Backend_Socket = io(`http://10.19.16.22:${this.configService.get('mongo.database').includes("_DEV") ? "3010":"3012" }`);
    // this.feListen();
    
  }

  handleConnection(client: IOSocket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: IOSocket) {
    console.log(`Client connected: ${client.id}`);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitEvent(eventName: string, data: any): void {
    console.log(`*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*`);
    console.log(`--------------| EMITIENDO SOCKET |---------------`);
    console.log(`*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*`);
    console.log(data);
    this.server.emit(eventName, data);
  }

  @SubscribeMessage('FE_TICKETS_TEST')
  handleMessage(client: IOSocket, payload: any): void {
    console.log("hola desde handleMessage!!");
    
    this.logger.log(`Message received: ${payload}`);
    client.broadcast.emit('messageEvent', payload);
  }

  ///////////////////////////////////////////////////////////////////////////////////
  //                    ESCUCHAR EVENTOS POR UNIDAD DE NEGOCIO
  ///////////////////////////////////////////////////////////////////////////////////
  // feListen(){
  //   for (const iterator of events.FEEvents) {
  //     this.FE_Backend_Socket.on( iterator, async (data) => {
  //       console.log("ESCUCHANDO ", iterator ,"!!");
  //       // console.log("//////////////////////////////////////////");
  //       // console.log(data);
  //       const response          = this._notifyService.FactoryExpressSocketDataNotification(iterator, data);
  //       const responseSaver:any = await this.save_notify(response);
  //       const areaName          = await this.validateBuName(responseSaver.bu)
  //       const usersUpdateByNoty = await this._UserProxyService.updateUserByNotify(responseSaver._id, responseSaver.role, areaName);
  //       if (!responseSaver) return;
  //       if (!usersUpdateByNoty) return;
  //       console.log(responseSaver);
  //       console.log(usersUpdateByNoty);
        
  //       await this.feEmit(responseSaver);
  //       this.logger.log(`Received ${iterator}: ${JSON.stringify(responseSaver)}`);
  //     });
  //   }
  // } 
  // userListen(){
  //   for (const iterator of events.USEREvents) {
  //     this.USER_Backend_Socket.on( iterator, (data) => {
  //       console.log("ESCUCHANDO ", iterator ,"!!");
  //       console.log("//////////////////////////////////////////");
  //       console.log(data);
  //       // this.feEmit(data);
  //       this.logger.log(`Received ${iterator}: ${JSON.stringify(data)}`);
  //     });
  //   }
  // }
  ///////////////////////////////////////////////////////////////////////////////////
  //                           GUARDANDO NOTIFICACION
  ///////////////////////////////////////////////////////////////////////////////////
  // async save_notify(data){
  //   // ----------------- save here ---------------
  //   const notifyObj = {
  //     owner       : null, // ESTO QUEDA PENDIENTE. NECESITO OBTENER EL USUARIO
  //     title       : data.FE_obj.title,
  //     description : data.FE_obj.description,
  //     date        : data.FE_obj.date,
  //     bu          : data.FE_obj.bu,
  //     role        : data.priority,
  //   }
  //   return await this._NotifySaverService.create_notify(notifyObj);
    
  //   // -------------------------------------------
  // }
  ///////////////////////////////////////////////////////////////////////////////////
  //                        NOTIFICANDO EVENTOS POR AREA
  ///////////////////////////////////////////////////////////////////////////////////
  /* 
  aqui debemos definir como voy a emitirles al frontend.
  recuerda que ahora debes estandarizar los nombres de los eventos por gerarquia HIGHT, MEDIUM, LOW
  Hay que establecer los nombres de los eventos segun su gerarquia por ejemplo:
  FE-Read_user-User-Admin-Super-Dev
  */
  // async feEmit(data){
  //   console.log("emitiendo...");
  //   let targetName = "FE";
  //   let auxPriority = false;
    
  //   for (const iterator of events.clientEvents) {
  //       targetName += "-"+iterator;
  //       if (data.role == iterator) auxPriority = true
  //       console.log("/////////////////////////////////////////////");
  //       console.log("data.role == iterator: ",auxPriority, " | ", data.role == iterator, "  ->  ", data.role, " == ", iterator);
  //       console.log("/////////////////////////////////////////////");
  //       if (auxPriority) {
  //         console.log("SOCKET ACTIVO: ",targetName);
  //         if (data) this.emitEvent(`${targetName}`, {ok:true, msg: `New Notification to ${iterator}!`, data})
  //       }
  //   }
  // }











  //|--------------------------------| funciones menores |------------------------------

  async validateBuName(bu:string):Promise<string>{
    return new Promise((resolve, reject)=>{
      try {
        let response = "";
        if(bu == "FE") response = "Factory";
        if(bu == "microsoft") response = "Microsoft";
        if(bu == "Lvo") response = "Lvo";
        if(bu == "user") response = "Users";
        resolve(response)
      } catch (error) {
        reject(error)
      }
    });
  }










} // end class

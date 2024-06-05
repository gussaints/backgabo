/* eslint-disable @typescript-eslint/no-empty-function */
// date-validation.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, ConflictException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { scheduleDateService } from 'src/_project-manager/service';
import { UserProxyService } from 'src/_share';
import { getParam_DTO } from '../dto';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { realDatesInterface } from 'src/_proyect-manager/interface';
// import { updateRDFinishDate_dto } from 'src/_proyect-manager/dto';

@Injectable()
export class getParamInterceptor implements NestInterceptor {
  constructor(
    // @InjectModel('PROYECTMANAGER_REALDATES') private readonly PROYECTMANAGER_REALDATESModel: Model<realDatesInterface>,
    // private readonly _schedule: scheduleDateService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return new Promise((resolve, reject)=>{
      try {
        const request = context.switchToHttp().getRequest();
        const { params } = request;
        // console.log("-- HOLA DESDE EL INTERCEPTOR PARAM--");
        console.log(params);
        const respond: getParam_DTO = {
          _order  :  JSON.parse(params._order.toLowerCase()),
          _since  :  Number(params._since),
          _limit  :  Number(params._limit),
          _active :  JSON.parse(params._active.toLowerCase()),
          _search :  params._search.toString(),
        };
        // console.log(typeof(respond._order)  + " - " + respond._order);
        // console.log(typeof(respond._since)  + " - " + respond._since);
        // console.log(typeof(respond._limit)  + " - " + respond._limit);
        // console.log(typeof(respond._active) + " - " + respond._active);
        // console.log(typeof(respond._search) + " - " + respond._search);
        // console.log(respond);
        
        if (!respond) throw new BadRequestException("Bad request!");
        context.switchToHttp().getRequest().params = respond;
        if (respond._since < 0 || respond._limit < 0) throw new BadRequestException("You can not use negative numbers!");
        return next.handle();
      } catch (error) {
        throw new BadRequestException(error);     
      }
    // });

    // if (!await this.isValidBody(body)) throw new BadRequestException('Invalid request body');
    // const response = await this._schedule.getScheduleDatesByID(body._scheduledDatesID);
    // if (!response) throw new BadRequestException(`${body._scheduledDatesID} not found!`);
    
    // console.log(response);
    
  }

  // private async isValidBody(body): Promise<boolean> {
  //   return new Promise(async(resolve, reject)=>{
  //     try {
  //         if (body && !(body.hasOwnProperty('_scheduledDatesID'))) throw new BadRequestException('_scheduledDatesID needed!');
  //         console.log("hola desde validacion");
          
  //         const scheduledDates = await this._schedule.getScheduleDatesByID(body._scheduledDatesID);
          
  //         if (!scheduledDates) throw new BadRequestException('Scheduled date not found!');
  //         const { finishDate } = scheduledDates;
  //         if (!finishDate) throw new ConflictException('Scheduled have not finishDate!');
  //         const currentDate = new Date();
  //         console.log(scheduledDates); 
  //         if (currentDate > finishDate) {
  //           console.log("TIEMPO DESFAZADO"); 

  //           if (!(body.hasOwnProperty('_title')) || !(body.hasOwnProperty('_reasons'))) {
  //             throw new BadRequestException(`Request denied due to delay. Provide justification. The actual time has exceeded the scheduled time.`);
  //           }
  //         }
  //         resolve( true );
  //     } catch (error) {
  //       reject( error );
  //     }
  //   });
  // }

}














// @Injectable()
// export class realDatesInterceptor implements NestInterceptor {
//   constructor(
//     // @InjectModel('PROYECTMANAGER_REALDATES') private readonly PROYECTMANAGER_REALDATESModel: Model<realDatesInterface>,
//     private readonly _proxyMicroservice: UserProxyService,
//   ) {}

//   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
//     const request = context.switchToHttp().getRequest();
//     const { body } = request;
//     console.log(body);
    
//     // if (!this.isValidBody(body)) throw new BadRequestException('Invalid request body');
//     const response = await this._proxyMicroservice.populateUserProxy(body._scheduledDatesID, "_id","DOCUMENTATION-MICROSERVICE-PROYECTMANAGER-SCHEDULEbyID");
//     console.log(response);
//     console.log("-- HOLA DESDE EL INTERCEPTOR --");
    
//     return next.handle();
//   }

//   // private async isValidBody(body): Promise<boolean> {
//   //   if (body && '_scheduledDatesID' in body) {
//   //     try {
//   //       const scheduledDates = await this.PROYECTMANAGER_REALDATESModel.findById(body._scheduledDatesID).populate('finishDate');
//   //       if (!scheduledDates) throw new BadRequestException('Scheduled date not found');
//   //       const { finishDate } = scheduledDates;
//   //       if (!finishDate) throw new ConflictException('Scheduled have not finishDate');
//   //       const currentDate = new Date();
//   //       if (currentDate > finishDate) 
//   //         if (!('_title' in body) || !('_reasons' in body)) throw new BadRequestException('Missing required fields properties')
//   //       return true;
//   //     } catch (error) {
//   //       throw new BadRequestException(error);
//   //     }
//   //   }

//     // return false;
//   // }
// }

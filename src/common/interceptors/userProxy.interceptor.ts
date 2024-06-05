/* eslint-disable prettier/prettier */
import { NestInterceptor, Injectable, CallHandler, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Observable, tap, timeout } from 'rxjs';
// SERVICE
import { UserProxyService } from 'src/_share/user-proxy/user-proxy.service';

@Injectable( )
export class ____user_proxy_Interceptor implements NestInterceptor {

    constructor( private readonly _userProxy: UserProxyService ) {}

    async intercept( context: ExecutionContext, next: CallHandler<any> ): Promise<Observable<any>> {
        return new Promise(async(resolve, reject)=>{
            try {
                const req = context.switchToHttp( ).getRequest( );
                console.log("+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+");
                console.log("+        HOLA DESDE EL INTERCEPTOR DE DOCUMENT        +");
                console.log("+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+-*+");
                
                const payload = {
                    method: req.method, 
                    params: req.params,
                    body: req.body, 
                    url:req.url,
                };
                console.log(payload.body);
                const respond = await this._userProxy.populateUserProxy(payload.body._ownerUserID, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                if (!respond) throw new BadRequestException(`${payload.body._file} not found! The file must exist to resolve this service.`);
                resolve( next.handle() );
            } catch (error) {
                reject(error)
            }
        })
    }  

};
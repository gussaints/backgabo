/* eslint-disable prettier/prettier */
import { NestInterceptor, Injectable, CallHandler, ExecutionContext } from "@nestjs/common";
import { timeout } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable( )
export class TimeOutInterceptor implements NestInterceptor {

    intercept( context: ExecutionContext, next: CallHandler<any> ): Observable<any> | Promise<Observable<any>> {
        
        return next.handle( ).pipe( timeout ( 120000 ) );

    }  

};
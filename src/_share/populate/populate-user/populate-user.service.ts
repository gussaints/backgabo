/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ConflictException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserProxyService } from 'src/_share/user-proxy/user-proxy.service';

@Injectable()
export class PopulateUserService {
    constructor(private readonly _proxyMicroservice: UserProxyService,){
    }
    /////////////////////////////////////////////////////////////////////////////////
    //                    popular tickets mediante arreglo
    /////////////////////////////////////////////////////////////////////////////////
    async __populate_user_Tickets(every: any[]): Promise<any[]> {
      return Promise.all(
          every.map(async (ticket) => {
              try {
                  let ownerPROD = ticket._ownerPROD;
                  let ownerQA = ticket._ownerQA;
                  let ownerTE = ticket._ownerTE;
                  let ownerEnd = ticket._ownerEnd;
                  let rejectedByQA = ticket._rejectedByQA;

                  // Verifica si _ownerPROD es un ObjectId válido antes de hacer la solicitud
                  if (Types.ObjectId.isValid(ticket._ownerPROD ) && ticket._ownerPROD != null) {
                      ownerPROD = await this._proxyMicroservice.populateUserProxy(ticket._ownerPROD , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                  }
                  if (Types.ObjectId.isValid(ticket._ownerQA ) && ticket._ownerQA != null) {
                    ownerQA = await this._proxyMicroservice.populateUserProxy(ticket._ownerQA , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                  }
                  if (Types.ObjectId.isValid(ticket._ownerTE ) && ticket._ownerTE != null) {
                    ownerTE = await this._proxyMicroservice.populateUserProxy(ticket._ownerTE , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                  }
                  if (Types.ObjectId.isValid(ticket._ownerEnd ) && ticket._ownerEnd != null) {
                    ownerEnd = await this._proxyMicroservice.populateUserProxy(ticket._ownerEnd , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                  }
                  //////////////////////////////////////////////////////////////////////
                  if (ticket._rejectedByQA) {
                    rejectedByQA = await this.processRejectedByQA(ticket._rejectedByQA);
                    rejectedByQA = this.cleanMongoArtifacts(rejectedByQA);
                  }
                  //////////////////////////////////////////////////////////////////////
                    
                  // Procesamos el arreglo _activeByQA
                  const activeByQA = await Promise.all(ticket._activeByQA.map(async (item) => {
                      if (Types.ObjectId.isValid(item.who)) {
                          const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                          return { ...item.toObject(), who: whoPopulated  };
                      }
                      return item;
                  })); 
  
                  const activeByTE = await Promise.all(ticket._activeByTE.map(async (item) => {
                    if (Types.ObjectId.isValid(item.who)) {
                        const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                        return { ...item.toObject(), who: whoPopulated };
                    }
                    return item; 
                }));

                const RejectTE = await Promise.all(ticket._rejectedByTE.map(async (item) => {
                    if (Types.ObjectId.isValid(item.who)) {
                        const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                        return { ...item.toObject(), who: whoPopulated };
                    }
                    return item;
                }));
                const OpenByQA = await Promise.all(ticket._openByQA.map(async (item) => {
                    if (Types.ObjectId.isValid(item.who)) {
                        const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                        return { ...item.toObject(), who: whoPopulated };
                    }
                    return item;
                }));


                // Desestructuramos el objeto del ticket y reemplazamos _ownerPROD, _ownerQA, _ownerTE, _ownerEnd y _activeByQA con los nuevos valores (sólo si son ObjectId válidos)
                return { 
                    ...ticket.toObject(),
                     _ownerPROD: ownerPROD,
                     _ownerQA: ownerQA,
                     _ownerTE: ownerTE,
                     _ownerEnd: ownerEnd, 
                     _activeByQA: activeByQA,
                     _activeByTE: activeByTE, 
                     _rejectedByTE:RejectTE, 
                     _rejectedByQA: rejectedByQA,
                     _openByQA : OpenByQA
                    //  != null ? rejectedByQA_auxWho
                    };

              } catch (error) {
                  throw new ConflictException(`error al procesar el ticket: ${error.message}`);
              }
            }) 
        );
    }

    private async processRejectedByQA(rejectedObj: any): Promise<any> {
        console.log("PROCESANDO...");
    
        if (!rejectedObj) {
            return rejectedObj;
        }
    
        const { _id, ownDate, who, comments, status, __v } = rejectedObj;
    
        if (Types.ObjectId.isValid(who)) {
            const populatedUser = await this._proxyMicroservice.populateUserProxy(who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
            
            // Reemplazar 'who' con el usuario poblado
            return {
                _id,
                ownDate,
                who: populatedUser,
                comments,
                status,
                __v
            };
        }
    
        return {
            _id,
            ownDate,
            who,
            comments,
            status,
            __v
        };
    }
    
    private cleanMongoArtifacts(obj: any): any {
        if(obj && obj.who) {
            // Limpiamos los campos no deseados del objeto principal
            delete obj.$__;
            delete obj.$isNew;
            delete obj._doc;
    
            // Limpiamos los campos no deseados del objeto 'who'
            delete obj.who.$__;
            delete obj.who.$isNew;
            delete obj.who._doc;
        }
        return obj;
    }
    
     
    
  
    
    async __populate_user_oneTicket(ticket: any): Promise<any> {
      try { 
          let ownerPROD = ticket._ownerPROD;
          let ownerQA = ticket._ownerQA;
          let ownerTE = ticket._ownerTE;
          let ownerEnd = ticket._ownerEnd;
          let rejectedByQA = ticket._rejectedByQA;

          // Verifica si _ownerPROD es un ObjectId válido antes de hacer la solicitud
          if (Types.ObjectId.isValid(ticket._ownerPROD)) {
              ownerPROD = await this._proxyMicroservice.populateUserProxy(ticket._ownerPROD , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
          }
          if (Types.ObjectId.isValid(ticket._ownerQA)) {
              ownerQA = await this._proxyMicroservice.populateUserProxy(ticket._ownerQA , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
          }
          if (Types.ObjectId.isValid(ticket._ownerTE)) {
              ownerTE = await this._proxyMicroservice.populateUserProxy(ticket._ownerTE , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
          }
          if (Types.ObjectId.isValid(ticket._ownerEnd)) {
              ownerEnd = await this._proxyMicroservice.populateUserProxy(ticket._ownerEnd , "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
          }
          //////////////////////////////////////////////////////////////////////
          if (ticket._rejectedByQA) {
            rejectedByQA = await this.processRejectedByQA(ticket._rejectedByQA); 
            rejectedByQA = this.cleanMongoArtifacts(rejectedByQA);
          }
        //////////////////////////////////////////////////////////////////////
          // Procesamos el arreglo _activeByQA
          const activeByQA = await Promise.all(ticket._activeByQA.map(async (item) => {
              if (Types.ObjectId.isValid(item.who)) {
                  const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                  return { ...item.toObject(), who: whoPopulated };
              }
              return item.toObject();
          }));

          const activeByTE = await Promise.all(ticket._activeByTE.map(async (item) => {
            if (Types.ObjectId.isValid(item.who)) {
                const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                return { ...item.toObject(), who: whoPopulated };
            }
            return item;
        }));

        const RejectTE = await Promise.all(ticket._rejectedByTE.map(async (item) => {
            if (Types.ObjectId.isValid(item.who)) {
                const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                return { ...item.toObject(), who: whoPopulated };
            }
            return item;
        }));
        
        const OpenByQA = await Promise.all(ticket._openByQA.map(async (item) => {
            if (Types.ObjectId.isValid(item.who)) {
                const whoPopulated = await this._proxyMicroservice.populateUserProxy(item.who, "_id", "USER-MICROSERVICE-FINDUSER-byVALandPARAM");
                return { ...item.toObject(), who: whoPopulated };
            }
            return item;
        }));
          // Desestructuramos el objeto del ticket y reemplazamos _ownerPROD, _ownerQA, _ownerTE, _ownerEnd y _activeByQA con los nuevos valores
          return { 
            ...ticket.toObject(),
            _ownerPROD: ownerPROD,
            _ownerQA: ownerQA,
            _ownerTE: ownerTE,
            _ownerEnd: ownerEnd,
            _activeByQA: activeByQA ,
            _activeByTE: activeByTE,
            _rejectedByTE:RejectTE,
            _rejectedByQA: rejectedByQA,
            _openByQA : OpenByQA
        };

      } catch (error) {
          throw new ConflictException(`error al procesar el ticket: ${error.message}`);
      }
    }

}

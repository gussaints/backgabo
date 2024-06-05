/* eslint-disable prettier/prettier */
import { Types } from "mongoose";

/* eslint-disable prettier/prettier */
export type iUser =  {
    // name
    idSocket?        : string;
    clock            : string;
    fingerprint_key? : string;
    img?             : string;
    password?        : string;
    mail?            : string;
    country?         : string;
    kindPhone?       : string;
    phone?           : string;
    authorized?      : boolean;
    firsttime?       : boolean;
    _boss?           : Types.ObjectId | any;
    _department?     : Types.ObjectId | any;
    _businnes?       : Types.Array<Types.ObjectId | any>;
    _myTools?        : Types.Array<Types.ObjectId | any>;
    _notifications?  : Types.Array<Types.ObjectId | any>;
    _role?           : Types.ObjectId | any;
    _rolePosition?   : Types.ObjectId | any;
    _shift?          : Types.ObjectId | any;
  };
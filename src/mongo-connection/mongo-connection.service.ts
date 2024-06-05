import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConnectionService {
  private dbConnection: Connection;
  DB_URI = '';

  constructor(private configSrvc: ConfigService) {
    // console.log('MongoConnectionService factory', this.DB_URI);
    this.createConnectionDB();
  }

  createConnectionDB() {
    const all       = this.configSrvc.get('env');
    const host      = this.configSrvc.get('env.DB_HOST');
    const dbport    = this.configSrvc.get('env.DB_PORT');
    const database  = this.configSrvc.get('env.DB_USAGE');
    // console.log('all', all);
    this.DB_URI = `mongodb://${host}:${dbport}/${database}`;
    // console.log('MongoConnectionService factory', this.DB_URI);
    this.dbConnection = mongoose.createConnection(this.DB_URI);

    this.dbConnection.once('open', () => {
      console.log(`connected to ${database}`);
    });

    this.dbConnection.once('error', () => {
      console.log(`error connecting to ${database}`);
    });
  }

  getConnection(): Connection {
    return this.dbConnection;
  }
}

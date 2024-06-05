import { registerAs } from '@nestjs/config';


export default registerAs( 'env', () => ( {
  DB_HOST             : process.env.DB_HOST || 'localhost',
  DB_PORT             : parseInt( process.env.DB_PORT, 10 ) || 27017,
  DB_USER             : process.env.DB_USER,
  DB_PASSWORD         : process.env.DB_PASSWORD,
  DB_USAGE            : process.env.DB_USAGE,
  RUNNIN_PORT         : parseInt( process.env.RUNNIN_PORT ),
  RUNNIN_PATH         : process.env.RUNNIN_PATH,
  JWT_SEED            : process.env.JWT_SEED,
  USER_MICROSERVICE   : parseInt( process.env.USER_MICROSERVICE )
}));
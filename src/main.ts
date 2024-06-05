/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// TOOLS
import { toolcolor } from './common/global';

// MODULES
import { AppModule } from './app.module';

async function bootstrap() {

  ////////////////////////////////////////////////////////////////////////////////
  //              CORS CONFIG (NO BORRAR COMENTARIOS)
  ////////////////////////////////////////////////////////////////////////////////
  // const app = await NestFactory.create(AppModule);
  // const corsEngineService = app.get(CorsEngineService);
  // const registeredIpAddresses = await corsEngineService.getRegisteredIpAddresses('yes');
  // const allowedOrigins = registeredIpAddresses.map((adress) => 
  // `${adress.protocol}${adress.ip}:${AppModule.database.includes("DEV")?adress.dev_port:adress.prod_port}`);
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error(`Your address does not have permission to access our endpoint`));
  //   },
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });
  // for (const iterator of registeredIpAddresses) {
  //   console.log(`${iterator.protocol}${iterator.ip}:${AppModule.database.includes("DEV")?iterator.dev_port:iterator.prod_port}`);
  // }
  ////////////////////////////////////////////////////////////////////////////////
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });
  ////////////////////////////////////////////////////////////////////////////////
  //                               MICROSERVICE CONFIG
  ////////////////////////////////////////////////////////////////////////////////
  const transport = Transport.TCP;
  const options = {
    // host: 'localhost',
    port            : AppModule.MICROSERVICE_PORT,
    name            : 'SRVR22',
    retryAttempts   : 3,
    retryDelay      : 100,
  };
  // const bodyLimit = 30_485_760; // 10MiB
  ////////////////////////////////////////////////////////////////////////////////
  //                               BACKEND CONFIG
  ////////////////////////////////////////////////////////////////////////////////
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes( new ValidationPipe( { whitelist: true, forbidNonWhitelisted: true } ) );
  // app.useGlobalInterceptors(new CustomInterceptor());
  ////////////////////////////////////////////////////////////////////////////////
  //                    DOCUMENTATION CONFIG
  ////////////////////////////////////////////////////////////////////////////////
  // const notifyOptions = new DocumentBuilder()
  //   .setTitle(AppModule.database + ": Notify")
  //   .setDescription('THE NOTIFY API DESCRIPTION')
  //   .setVersion('1.0')
  //   // .addTag('notify')
  //   .addBearerAuth({ bearerFormat: 'JWT', type: 'http' },'jwt')
  //   .build();
  

  // const notifyDocument         = SwaggerModule.createDocument(app, notifyOptions,         { include: [NotifyModule]});
  
  // const notifyPath         = '/api/notify/';

  // SwaggerModule.setup(notifyPath,         app, notifyDocument);

  ////////////////////////////////////////////////////////////////////////////////
  //                     MICROSERVICE INITIAL
  ////////////////////////////////////////////////////////////////////////////////
  // console.log(`beginning...`);
  app.connectMicroservice(
    {
      transport,
      options,
    },
    { inheritAppConfig: true },
  );
  ////////////////////////////////////////////////////////////////////////////////
  //                         RUNNING APPS
  ////////////////////////////////////////////////////////////////////////////////
  await app.listen(AppModule.RUNNIN_PORT);
  await app.startAllMicroservices();
  // console.log(`server running at port ${AppModule.port}`);
  // console.log('Microservice is on port ', options.port, options.name);
  console.log(`${toolcolor.yellow}******************************************************${toolcolor.reset}`);
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} HOST              ${toolcolor.reset}: ${toolcolor.green  } ${AppModule.DB_HOST           }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} DB_USER           ${toolcolor.reset}: ${toolcolor.green  } ${AppModule.DB_USER           }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} DB_USAGE          ${toolcolor.reset}: ${toolcolor.green  } ${AppModule.DB_USAGE          }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} RUNNING PORT      ${toolcolor.reset}: ${toolcolor.yellow } ${AppModule.RUNNIN_PORT       }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} MICROSERVICE PORT ${toolcolor.reset}: ${toolcolor.yellow } ${AppModule.MICROSERVICE_PORT }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} IP RUNNING        ${toolcolor.reset}: ${toolcolor.red    } ${AppModule.serverIP          }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} PATH              ${toolcolor.reset}: ${toolcolor.green  } ${AppModule.RUNNIN_PATH       }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} USER MICROSERVICE ${toolcolor.reset}: ${toolcolor.yellow } ${AppModule.USER_MICROSERVICE }  ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}******************************************************${toolcolor.reset}`);
}
bootstrap();

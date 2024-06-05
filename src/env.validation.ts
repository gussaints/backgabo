// import { plainToClass } from 'class-transformer';
// import {
//   IsAlphanumeric,
//   IsEnum,
//   IsNumber,
//   validateSync,
// } from 'class-validator';

// enum EnvironmentType {
//   Dev = 'dev',
//   Prod = 'prod',
// }

// class EnvironmentVariables {
//   @IsEnum(EnvironmentType)
//   NODE_ENV: EnvironmentType;

//   @IsNumber()
//   PORT: number;

//   // @IsAlphanumeric()
//   // REDIS_HOST: string;

//   // @IsNumber()
//   // REDIS_PORT: string;
// }

// export function validate(configuration: Record<string, unknown>) {
//   const finalConfig = plainToClass(EnvironmentVariables, configuration, {
//     enableImplicitConversion: true,
//   });

//   const errors = validateSync(finalConfig, { skipMissingProperties: true });

//   if (errors.length > 0) {
//     throw new Error(errors.toString());
//   }

//   return finalConfig;
// }
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  RUNNIN_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) { 
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

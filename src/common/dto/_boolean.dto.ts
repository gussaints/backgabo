


/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsMongoId, IsOptional, IsString,  } from 'class-validator';
import { Types } from 'mongoose';

export class boolean_DTO {
    @ApiProperty({
        name        : "_boolean",
        type        : 'boolean',
        description : 'a bolean validation dto',
        example     : true
    })
    @IsBoolean() _boolean:boolean;

}
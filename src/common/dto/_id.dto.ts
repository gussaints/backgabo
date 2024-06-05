/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsNotEmpty, IsNumber, IsString, ValidateNested, ArrayMinSize, IsArray, IsMongoId, Validate, Matches, MinLength, IsObject, IsBoolean, Min, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { ValidateStatusDecorator, GetPlatformByIdDecorator } from '../decorator';

export class _id_DTO {
///////////////////////////////////////////////////////////////////////////
    @ApiProperty( { 
        name:'_id', 
        type: 'Types.ObjectId', 
        description: 'id on payload', 
        example: "657b5d0e1522c24ccfba0eb5",
        required: true
    } )
    @IsNotEmpty( )
    @IsMongoId( ) _id: Types.ObjectId;
}
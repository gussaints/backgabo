/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsNotEmpty, IsNumber, IsString, ValidateNested, ArrayMinSize, IsArray, IsMongoId, Validate, Matches, MinLength, IsObject, IsBoolean, Min, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { ValidateStatusDecorator, GetPlatformByIdDecorator } from '../decorator';

export class getParam_DTO {
///////////////////////////////////////////////////////////////////////////
    @ApiProperty( { 
        name:'_order', 
        type: 'boolean', 
        description: 'sort data from the database', 
        example: true,
        required: true
    } )
    @IsNotEmpty( )
    @IsBoolean( ) _order: boolean;

    @ApiProperty( { 
        name:'_since', 
        type: 'number', 
        description: 'skip information from database', 
        example: 0,
        required: true
    } )
    @IsNotEmpty( )
    @Min(0)
    @IsNumber( ) _since: number;

    @ApiProperty( { 
        name:'_limit', 
        type: 'number', 
        description: 'limit of information from database', 
        example: 0,
        required: true
    } )
    @IsNotEmpty( )
    @Min(0)
    @IsNumber( ) _limit: number;

    @ApiProperty( { 
        name:'_active', 
        type: 'boolean', 
        description: 'active or inactive information', 
        example: true,
        required: true
    } )
    @IsNotEmpty( )
    @IsBoolean( ) _active: boolean;

    @ApiProperty( { 
        name:'_search', 
        type: 'string', 
        description: 'search specific information from database', 
        example: "_",
        required: false
    } )
    @IsOptional( )
    @IsString( ) _search: string = "_";

} // end class



/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmpty, IsMongoId, IsNotEmpty, IsOptional, IsString,  } from 'class-validator';
import { Types } from 'mongoose';
import { iUser } from 'src/_share/interfaces';

export class pushDeleteArrayById_DTO {
    @ApiProperty( { 
        name:'_id', 
        type: 'Types.ObjectId', 
        description: 'id on payload', 
        example: "657b5d0e1522c24ccfba0eb5",
        required: true
    } )
    @IsNotEmpty( )
    @IsMongoId( ) _id: Types.ObjectId;

    @ApiProperty({
        name        : "_mode",
        type        : 'boolean',
        description : 'a bolean validation dto',
        example     : true
    })
    @IsBoolean() _mode:boolean;
}

export class pushDeleteArrayByIds_DTO {
    @ApiProperty( { 
        name:'_id', 
        type: 'Types.ObjectId', 
        description: 'id on payload', 
        example: ["657b5d0e1522c24ccfba0eb5","657b5d0e1522c24ccfba0eb6"],
        required: true
    } )
    @IsNotEmpty( )
    @IsMongoId({ each: true})
    @Type(() => String)
    readonly _id: Types.ObjectId[];

    @ApiProperty({
        name        : "_mode",
        type        : 'boolean',
        description : 'a bolean validation dto',
        example     : true
    })
    @IsBoolean() _mode:boolean;
}

export class pushDeleteArrayByIdUser_DTO {
    @ApiProperty( { 
        name:'_id', 
        type: 'Types.ObjectId', 
        description: 'id on payload', 
        example: ["657b5d0e1522c24ccfba0eb5","657b5d0e1522c24ccfba0eb6"],
        required: true
    } )
    @IsNotEmpty( )
    @IsMongoId({ each: true})
    @Type(() => String)
    readonly _id: Types.ObjectId[]


    @ApiProperty({
        name        : "_mode",
        type        : 'boolean',
        description : 'a bolean validation dto',
        example     : true
    })
    @IsBoolean() _mode:boolean;
}

export class pushDeleteArrayByString_DTO {
    @ApiProperty( { 
        name:'_string', 
        type: 'string', 
        description: 'string on payload', 
        example: "qwerty",
        required: true
    } )
    @IsNotEmpty( )
    @IsMongoId( ) _string: string;

    @ApiProperty({
        name        : "_mode",
        type        : 'boolean',
        description : 'a bolean validation dto',
        example     : true
    })
    @IsBoolean() _mode:boolean;
}
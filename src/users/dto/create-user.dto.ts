import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    refreshtoken: string;
}

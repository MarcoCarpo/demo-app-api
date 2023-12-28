import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}

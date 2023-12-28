import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    images: number[];

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}

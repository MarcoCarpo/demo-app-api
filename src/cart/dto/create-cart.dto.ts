import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    value?: number;
}

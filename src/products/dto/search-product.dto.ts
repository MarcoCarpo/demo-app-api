import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { OrderBy } from '../enums/order-by.enums';

export class SearchProductsDto {
    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
    @IsOptional({ each: true })
    categoryIds?: number[];

    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    page?: number;

    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    limit?: number;

    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive()
    @IsOptional()
    minPrice?: number;

    @ApiProperty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive()
    @IsOptional()
    maxPrice?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isOnSale?: boolean;
}

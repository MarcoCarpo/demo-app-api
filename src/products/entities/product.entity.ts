import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    images: number[];

    @ApiProperty()
    categoryId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, nullable: true })
    userId: number | null;

    constructor(data: Partial<ProductEntity>) {
        Object.assign(this, data);
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { Image, Product } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ProductEntity implements Product {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @Exclude()
    imageId: number;

    @ApiProperty()
    categoryId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, nullable: true })
    userId: number | null;

    @Exclude()
    Image: Image;

    @ApiProperty()
    image: Image;

    constructor(data: Partial<ProductEntity>) {
        Object.assign(this, data);
        this.image = data.Image;
    }
}

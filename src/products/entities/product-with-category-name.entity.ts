import { Exclude } from 'class-transformer';
import { ProductWithCategoryEntity } from './product-with-category.entity';
import { ProductEntity } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductWithCategoryNameEntity extends ProductEntity {
    @Exclude()
    ProductCategory: { name: string };

    @Exclude()
    categoryId: number;

    @ApiProperty()
    categoryName: string;

    constructor(product: ProductWithCategoryEntity) {
        super(product);
        this.categoryName = product.ProductCategory.name;
    }
}

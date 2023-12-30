import { ProductEntity } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductWithCategoryEntity extends ProductEntity {
    @ApiProperty()
    ProductCategory: { name: string };

    constructor(product: ProductEntity) {
        super(product);
    }
}

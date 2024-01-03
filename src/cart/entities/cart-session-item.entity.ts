import { Product } from '@prisma/client';

export class CartSessionItemEntity implements Product {
    id: number;
    productId: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    imageId: number;
    onSale: boolean;
    salePercentage: number;

    constructor(partial: Partial<CartSessionItemEntity>) {
        Object.assign(this, partial);
        this.quantity = partial.quantity;
    }
}

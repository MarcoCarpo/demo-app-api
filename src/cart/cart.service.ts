import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartSessionItemEntity } from './entities/cart-session-item.entity';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addProductsToCart(userId: number, createCartDto: CreateCartDto) {
        const { productId, value } = createCartDto;
        let userCart = await this.prisma.cartSession.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!userCart) {
            userCart = await this.prisma.cartSession.create({
                data: {
                    userId: userId,
                },
            });
        }

        // If the product is already in the cart, increase the quantity
        const existingProduct = await this.prisma.cartSessionItem.findFirst({
            where: {
                cartId: userCart.id,
                productId: productId,
            },
        });

        if (value === 0) {
            await this.prisma.cartSessionItem.delete({
                where: {
                    id: existingProduct.id,
                },
            });
        } else {
            if (existingProduct) {
                await this.prisma.cartSessionItem.update({
                    where: {
                        id: existingProduct.id,
                    },
                    data: {
                        quantity: value,
                    },
                });
            } else {
                await this.prisma.cartSessionItem.create({
                    data: {
                        cartId: userCart.id,
                        productId: productId,
                        quantity: 1,
                    },
                });
            }
        }
    }

    async getCart(userId: number) {
        const cart = await this.prisma.cartSession.findFirst({
            where: { userId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) {
            return [];
        }

        return cart.items.map(
            (item) =>
                new CartSessionItemEntity({
                    ...item.product,
                    productId: item.product.id,
                    id: item.id,
                    quantity: item.quantity,
                }),
        );
    }
}

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchProductsDto } from './dto/search-product.dto';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { ProductWithCategoryEntity } from './entities/product-with-category.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        return await this.prisma.product.create({ data: createProductDto });
    }

    async findAll(body: SearchProductsDto) {
        const {
            categoryIds,
            limit = 10,
            page = 0,
            minPrice,
            maxPrice,
            orderBy: orderByParam,
        } = body;
        const paginate = createPaginator({ perPage: limit, page });

        const orderBy = (): Prisma.ProductOrderByWithRelationInput => {
            switch (orderByParam) {
                case 'auto':
                    return {
                        id: 'desc',
                    };
                case 'price_asc':
                    return {
                        price: 'asc',
                    };
                case 'price_desc':
                    return {
                        price: 'desc',
                    };
                default:
                    return {
                        id: 'desc',
                    };
            }
        };

        return paginate<ProductWithCategoryEntity, Prisma.ProductFindManyArgs>(
            this.prisma.product,
            {
                orderBy: orderBy(),
                skip: page * limit,
                take: limit,
                where: {
                    ProductCategory: {
                        id: {
                            in: categoryIds,
                        },
                    },
                    price: {
                        gte: minPrice,
                        lte: maxPrice,
                    },
                },
                include: {
                    ProductCategory: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        );

        // return await this.prisma.product.findMany({
        //     orderBy: {
        //         id: 'desc',
        //     },
        //     skip: page * limit,
        //     take: limit,
        //     where: {
        //         ProductCategory: {
        //             id: {
        //                 in: categoryIds,
        //             },
        //         },
        //         price: {
        //             gte: minPrice,
        //             lte: maxPrice,
        //         },
        //     },
        //     include: {
        //         ProductCategory: {
        //             select: {
        //                 name: true,
        //             },
        //         },
        //     },
        // });
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUniqueOrThrow({
            where: {
                id: id,
            },
        });

        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        await this.findOne(id);

        return await this.prisma.product.update({
            where: {
                id: id,
            },
            data: updateProductDto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return await this.prisma.product.delete({
            where: {
                id: id,
            },
        });
    }
}

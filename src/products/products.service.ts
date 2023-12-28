import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        return await this.prisma.product.create({ data: createProductDto });
    }

    async findAll() {
        return await this.prisma.product.findMany({
            orderBy: {
                id: 'desc',
            },
        });
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

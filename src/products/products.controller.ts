import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchProductsDto } from './dto/search-product.dto';
import { ProductWithCategoryNameEntity } from './entities/product-with-category-name.entity';

@Controller('products')
@ApiTags('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiCreatedResponse({ type: ProductEntity })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async create(@Body() createProductDto: CreateProductDto) {
        return new ProductEntity(
            await this.productsService.create(createProductDto),
        );
    }

    @Post('/search')
    async findAll(@Body() body: SearchProductsDto) {
        const products = await this.productsService.findAll(body);

        return {
            data: products.data.map(
                (product) => new ProductWithCategoryNameEntity(product),
            ),
            meta: products.meta,
        };
    }

    // @Get(':id')
    // @ApiOkResponse({ type: ProductEntity })
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    // async findOne(@Param('id', ParseIntPipe) id: number) {
    //     return new ProductEntity(await this.productsService.findOne(id));
    // }

    // @Patch(':id')
    // @ApiOkResponse({ type: ProductEntity })
    // async update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateProductDto: UpdateProductDto,
    // ) {
    //     return new ProductEntity(
    //         await this.productsService.update(id, updateProductDto),
    //     );
    // }

    // @Delete(':id')
    // @ApiOkResponse({ type: ProductEntity })
    // async remove(@Param('id', ParseIntPipe) id: number) {
    //     return new ProductEntity(await this.productsService.remove(id));
    // }
}

import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
@ApiTags('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiCreatedResponse({ type: ProductEntity })
    async create(@Body() createProductDto: CreateProductDto) {
        return new ProductEntity(
            await this.productsService.create(createProductDto),
        );
    }

    @Get()
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    async findAll() {
        return (await this.productsService.findAll()).map(
            (product) => new ProductEntity(product),
        );
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

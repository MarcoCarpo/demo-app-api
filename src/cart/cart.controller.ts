import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartSessionItemEntity } from './entities/cart-session-item.entity';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('/add-products')
    @ApiOkResponse()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async addProductsToCart(
        @Req() req: Request,
        @Body() createCartDto: CreateCartDto,
    ) {
        await this.cartService.addProductsToCart(req.user['id'], createCartDto);
    }

    @Get()
    @ApiOkResponse({ type: CartSessionItemEntity, isArray: true })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getCart(@Req() req: Request) {
        return await this.cartService.getCart(req.user['id']);
    }
}

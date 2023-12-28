import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartService } from './cart.service';
import { UsersModule } from 'src/users/users.module';
import { CartController } from './cart.controller';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [CartController],
    providers: [CartService],
    exports: [],
})
export class CartModule {}

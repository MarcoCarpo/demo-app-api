import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:
                process.env.NODE_ENV === 'development'
                    ? '.env.development'
                    : '.env',
            expandVariables: true,
        }),
        AuthModule,
        PrismaModule,
        ProductsModule,
        UsersModule,
        CartModule,
        CategoriesModule,
        CloudinaryModule,
    ],
    controllers: [],
    providers: [CartService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleControlService } from 'src/auth/role-control.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService, RoleControlService, JwtService],
    exports: [UsersService],
})
export class UsersModule {}

import {
    Controller,
    Get,
    Body,
    Patch,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { $Enums, User } from '@prisma/client';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('user')
@ApiTags('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles($Enums.UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiOkResponse({ type: UserEntity })
    @ApiBearerAuth()
    async findAll(@Req() req: Request) {
        const user = req.user as User;

        return new UserEntity(await this.usersService.findOne(user.id));
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity })
    @ApiBearerAuth()
    async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        const { id } = req.user as User;

        return new UserEntity(
            await this.usersService.update(id, updateUserDto),
        );
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity })
    @ApiBearerAuth()
    async remove(@Req() req: Request) {
        const { id } = req.user as User;
        return new UserEntity(await this.usersService.remove(id));
    }
}

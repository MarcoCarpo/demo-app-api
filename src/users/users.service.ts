import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    // async create(createUserDto: CreateUserDto) {
    //     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    //     createUserDto.password = hashedPassword;

    // 	const refreshToken

    //     return this.prisma.user.create({ data: createUserDto });
    // }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findFirstOrThrow({
            where: { id: id },
            include: { Image: true },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserDto.password,
                10,
            );
            updateUserDto.password = hashedPassword;
        }
        const { address, ...rest } = updateUserDto;

        return this.prisma.user.update({
            where: { id: id },
            data: {
                ...rest,
                ...address,
            },
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id: id } });
    }
}

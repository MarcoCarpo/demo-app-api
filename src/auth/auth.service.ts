import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<AuthEntity> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { email: loginDto.email },
        });

        if (!this.validatePassword(loginDto.password, user.password)) {
            throw new UnauthorizedException();
        }

        return this.getTokens(user);
    }

    async register(registerDto: RegisterDto): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });

        if (user) {
            throw new UnauthorizedException();
        }

        if (registerDto.password !== registerDto.confirmPassword) {
            throw new UnauthorizedException();
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const createdUser = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
                name: registerDto.name,
                refreshToken: null,
            },
        });

        return this.getTokens(createdUser);
    }

    async refreshAccessToken(refreshToken: string): Promise<AuthEntity> {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: process.env.REFRESH_JWT_SECRET,
        });

        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: payload.userId,
            },
        });

        const isRefreshTokenValid = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );

        if (!isRefreshTokenValid) {
            throw new UnauthorizedException();
        }

        const tokens = await this.generateJwtTokens({
            userId: user.id,
            email: user.email,
        });

        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async logout(userId: number) {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: null,
            },
        });
    }

    public async getTokens(user: User) {
        const tokens = await this.generateJwtTokens({
            userId: user.id,
            email: user.email,
        });
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return new AuthEntity(tokens);
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: hashedRefreshToken,
            },
        });
    }

    private validatePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    private async generateJwtTokens(payload: {
        userId: number;
        email: string;
    }) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId: payload.userId,
                    email: payload.email,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1h',
                },
            ),
            this.jwtService.signAsync(
                {
                    userId: payload.userId,
                    email: payload.email,
                },
                {
                    secret: process.env.REFRESH_JWT_SECRET,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}

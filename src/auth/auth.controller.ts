import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOkResponse({ type: AuthEntity })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('refresh-token')
    @ApiOkResponse({ type: AuthEntity })
    async refreshAccessToken(@Body() body: RefreshTokenDto) {
        const newTokens = await this.authService.refreshAccessToken(
            body.refreshToken,
        );
        return newTokens;
    }

    @Post('logout')
    @ApiOkResponse()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    logout(@Req() req: Request) {
        this.authService.logout((req.user as UserEntity).id);
    }
}

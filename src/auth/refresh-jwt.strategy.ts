import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
    Strategy,
    'refresh-jwt',
) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.REFRESH_JWT_SECRET,
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = req
            .get('Authorization')
            .replace('Bearer', '')
            .trim();
        return { ...payload, refreshToken };
    }
}

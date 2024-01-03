import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { RoleControlService } from './role-control.service';
import { JwtService } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';

export class TokenDto {
    id: number;
    role: $Enums.UserRole;
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private accessControlService: RoleControlService,
        private jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<
            $Enums.UserRole[]
        >(ROLES_KEY, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();

        const payload = await this.jwtService.verifyAsync(
            request.headers.authorization.split(' ')[1],
            {
                secret: process.env.JWT_SECRET,
            },
        );

        for (const role of requiredRoles) {
            const result = this.accessControlService.isAuthorized({
                requiredRole: role,
                currentRole: payload.role,
            });

            if (result) {
                return true;
            }
        }

        return false;
    }
}

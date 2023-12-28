//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    constructor(partial: Partial<AuthEntity>) {
        Object.assign(this, partial);
    }
}

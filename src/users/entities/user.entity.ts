import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
        this.address = {
            street: partial.street,
            city: partial.city,
            zipCode: partial.zipCode,
            country: partial.country,
        };
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: 'enum', enum: $Enums.UserRole })
    role: $Enums.UserRole;

    @Exclude()
    password: string;

    @Exclude()
    street: string;

    @Exclude()
    city: string;

    @Exclude()
    zipCode: string;

    @Exclude()
    country: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @Exclude()
    refreshToken: string;

    @ApiProperty({
        type: 'object',
        properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            zipCode: { type: 'string' },
            country: { type: 'string' },
        },
    })
    address: {
        street: string;
        city: string;
        zipCode: string;
        country: string;
    };
}

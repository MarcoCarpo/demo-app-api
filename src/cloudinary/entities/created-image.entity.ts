import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateImageEntity {
    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsString()
    public_id: string;

    constructor(url: string, public_id: string) {
        this.url = url;
        this.public_id = public_id;
    }
}

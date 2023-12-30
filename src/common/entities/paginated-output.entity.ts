import { ApiProperty } from '@nestjs/swagger';

export class PaginatedOutputEntity<T> {
    @ApiProperty({ type: 'array', isArray: true })
    data: T[];

    @ApiProperty()
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number | null;
        next: number | null;
    };
}

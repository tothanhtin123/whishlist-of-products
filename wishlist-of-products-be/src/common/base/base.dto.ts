import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FilterQuery, SortOrder } from 'mongoose';
import { IsNumber } from '../decorators/validation.decorator';

export class PaginationDto {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 10))
	@ApiProperty({ description: 'Number of items each page', example: '10' })
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 1))
	@ApiProperty({ description: 'Total number of pages', example: '1' })
	page?: number;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({
		description: 'Sort',
		example: '{ "createdAt": "ASC" }',
		type: 'string'
	})
	sort?: Record<string, SortOrder>;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({
		description: 'Filter',
		example: '{ "name": "string" }',
		type: 'string'
	})
	filter?: FilterQuery<any>;

	@IsOptional()
	@ApiProperty({ description: 'Search', example: '' })
	search?: string;
}

export class IPagination {

	@Expose()
	limit!: number;
	
	@Expose()
	page!: number;

	@Expose()
	total!: number;
}

export class BaseResponse {
	/** ObjectId */
	@ApiProperty({ description: 'ObjectId' })
	@Expose()
	id!: string;

	/** Ngày tạo */
	@ApiProperty({ description: 'Created Date' })
	@Expose()
	createdAt!: Date;

	/** Lần cuối update */
	@ApiProperty({ description: 'Updated Date' })
	@Expose()
	updatedAt!: Date;

	/** Ngày xoá */
	@ApiProperty({ description: 'Deleted Date' })
	@Expose()
	deletedAt?: Date;
}

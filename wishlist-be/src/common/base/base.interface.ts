import {
  Aggregate,
  AggregateOptions,
  PipelineStage,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { BaseModel } from './base.model';

/**
 * @template T Type of Data
 */
export abstract class AbstractBaseService<T extends BaseModel> {
  /**
   * Create a Record
   * @param data
   * @returns Promise<T>
   * @example service.create({ name: 'John Doe' })
   */
  abstract create(data: Partial<T>): Promise<T>;
  /**
   * Create multiple records
   * @param data
   * @returns Promise<T[]>
   * @example service.createMany([{ name: 'John Doe' }, { name: 'Jane Doe' }])
   */
  abstract createMany(data: Partial<T>[]): Promise<T[]>;

  /**
   * Lấy một record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T | null>
   * @example service.getOne({ where: { name: 'John Doe' } })
   */
  abstract getOne(options: FindOptions<T>): Promise<T | null>;
  /**
   * Lấy một record, nếu không tìm thấy, trả về lỗi NotFound
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.getOneOrFail({ where: { name: 'John Doe' } })
   */
  abstract getOneOrFail(options: FindOrFailOptions<T>): Promise<T>;

  /**
   * Lấy một record theo id
   * @param id Id của record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T | null>
   * @example service.getOneById('uuid', { where: { name: 'John Doe' } })
   */
  abstract getOneById(
    id: string,
    options?: Partial<FindOptions<T>>,
  ): Promise<T | null>;
  /**
   * Lấy một record theo id, nếu không tìm thấy, trả về lỗi NotFound
   * @param id Id của record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.getOneByIdOrFail('uuid', { where: { name: 'John Doe' } })
   */
  abstract getOneByIdOrFail(
    id: string,
    options?: Partial<FindOrFailOptions<T>>,
  ): Promise<T>;

  /**
   * Lấy tất cả record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T[]>
   * @example service.getAll({ where: { name: 'John Doe' } })
   */
  abstract getAll(options?: Partial<FindOptions<T>>): Promise<T[]>;
  /**
   * Lấy tất cả record và phân trang
   * @param options Tùy chọn để lấy record
   * @returns Promise<IPaginationResponse<T>>
   * @example service.getAllPaginated({ where: { name: 'John Doe' }, limit: '10', page: '1' })
   */
  abstract getAllPaginated(
    options?: FindPaginatedOptions<T>,
  ): Promise<IPaginationResponse<T>>;

  /**
   * Cập nhật một record, nếu không tìm thấy, trả về lỗi NotFound
   * @param options Tùy chọn để lấy record
   * @param data Dữ liệu để cập nhật record
   * @returns Promise<T>
   * @example service.update({ where: { name: 'John Doe' } }, { name: 'Jane Doe updated' })
   */
  abstract updateOne(
    options: FindOrFailOptions<T>,
    data: UpdateQuery<T>,
  ): Promise<T>;
  /**
   * Cập nhật một record theo id, nếu không tìm thấy, trả về lỗi NotFound
   * @param id Id của record
   * @param data Dữ liệu để cập nhật record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.updateById('uuid', { name: 'Jane Doe updated' }, { loadEagerRelations: false, errorMessage: 'Not found' } })
   */
  abstract updateById(
    id: string,
    data: UpdateQuery<T>,
    options?: Partial<FindOrFailOptions<T>>,
  ): Promise<T>;

  /**
   * Xoá một record, nếu không tìm thấy, trả về lỗi NotFound
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.remove({ where: { name: 'John Doe' } })
   */
  abstract remove(options: FindOrFailOptions<T>): Promise<T>;
  /**
   * Xoá một record theo id, nếu không tìm thấy, trả về lỗi NotFound
   * @param id Id của record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.removeById('uuid', { loadEagerRelations: false, errorMessage: 'Not found' } })
   */
  abstract removeById(
    id: string,
    options?: Partial<FindOrFailOptions<T>>,
  ): Promise<T>;

  /**
   * Xoá tất cả record
   * @returns Promise<T>
   * @example service.removeAll()
   */
  abstract removeAll(): Promise<DeleteResult>;

  /**
   * Xoá mềm một record, nếu không tìm thấy, trả về lỗi NotFound
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.softRemove({ where: { name: 'John Doe' } })
   */
  abstract softRemove(options: FindOrFailOptions<T>): Promise<T>;
  /**
   * Xoá mềm một record theo id
   * @param id Id của record
   * @param options Tùy chọn để lấy record
   * @returns Promise<T>
   * @example service.softRemoveById('uuid', { loadEagerRelations: false, errorMessage: 'Not found' } })
   */
  abstract softRemoveById(
    id: string,
    options?: Partial<FindOrFailOptions<T>>,
  ): Promise<T>;

  /**
   * Xoá mềm tất cả record
   * @returns Promise<T>
   * @example service.softRemoveAll()
   */
  abstract softRemoveAll(): Promise<UpdateWriteOpResult>;

  /**
   * Đếm record
   * @param options Tùy chọn để lấy record
   * @returns Promise<number>
   * @example service.count({ where: { name: 'John Doe' } })
   */
  abstract count(options: Partial<FindOptions<T>>): Promise<number>;
  /**
   * Lấy một record hoặc tạo mới
   * @param options Tùy chọn để lấy record
   * @param data Dữ liệu để tạo record
   * @returns Promise<T>
   * @example service.getOneOrCreate({ where: { name: 'John Doe' } }, { name: 'John Doe' })
   */
  abstract getOneOrCreate(
    options: FindOptions<T>,
    data?: Partial<T>,
  ): Promise<T>;

  abstract aggregate(
    pipeline?: PipelineStage[],
    options?: AggregateOptions,
  ): Aggregate<Array<T>>;
}

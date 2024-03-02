import { FilterQuery, SortOrder } from 'mongoose';
import { BaseModel } from 'src/common/base/base.model';

declare global {
  type FindOptions<T extends BaseModel> = {
    /** Condition */
    where?: FilterQuery<T>;
    /** Sort
     * @example { createdAt: -1 }
     */
    sort?:
      | string
      | { [key: string]: SortOrder | { $meta: any } }
      | [string, SortOrder][]
      | undefined
      | null;
    /** Join tables */
    relations?: string | string[];
    /** Include data deleted */
    withDeleted?: boolean;
    /** select fields */
    select?: string | string[];
  };

  type FindOrFailOptions<T extends BaseModel> = FindOptions<T> & {
    /** Not found error message */
    errorMessage?: string;
  };

  type FindPaginatedOptions<T extends BaseModel> = Partial<FindOptions<T>> & {
    /** Number of items in a page */
    limit?: number;
    /** Total Page */
    page?: number;
    /**
     * Filter
     * @examples { "name": "ABC" }
     */
    filter?: FilterQuery<T>;
    /** Search*/
    search?: string;
  };

  type GenerateTokenData = {
    accessToken: string;
  };

  type LogoutData = {
    success: boolean;
  };
  type DeleteResult = {
    acknowledged: boolean;
    deletedCount: number;
  };
  class IResponse<T extends BaseModel> {
    /** Response status code */
    status!: number;
    /** Message */
    message!: string;
    /** Data */
    data!: T;
    /** Pagination Metadata */
    pagination?: {
      limit: number;

      page: number;

      total: number;
    };
  }
  class IPaginationResponse<T> {
    @Expose()
    data!: T[];

    @Expose()
    pagination!: IPagination;
  }
}

export {};

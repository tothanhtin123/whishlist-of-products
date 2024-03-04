import { SortOrder } from "@/app/enums/api-request.enum";

export class PaginationPayload {
  limit?: number;
  page?: number;
  sort?: string;
  filter?: string;
  search?: string;
}

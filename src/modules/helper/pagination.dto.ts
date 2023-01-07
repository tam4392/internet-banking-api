export class PaginationDto {
  page: number;
  limit: number;
  id?: any;
}

export class PaginatedResultDto {
  data: any[];
  page: number;
  limit: number;
  totalCount: number;
}

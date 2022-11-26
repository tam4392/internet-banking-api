export class PaginationDto {
  page: number;
  limit: number;
}

export class PaginatedResultDto {
  data: any[];
  page: number;
  limit: number;
  totalCount: number;
}

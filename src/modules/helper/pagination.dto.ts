export class PaginationDto {
  page: number;
  limit: number;
  createdBy?: any;
}

export class PaginatedResultDto {
  data: any[];
  page: number;
  limit: number;
  totalCount: number;
}

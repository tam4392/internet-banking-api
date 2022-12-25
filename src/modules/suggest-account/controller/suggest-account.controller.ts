import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import {
  PaginatedResultDto,
  PaginationDto,
} from 'src/modules/helper/pagination.dto';
import { CreateDto, UpdateDto } from '../dto/suggest-account.dto';
import { SuggestAccount } from '../entities/suggest-account.entities';
import { SuggestAccountService } from '../service/suggest-account.service';

@Controller('api/suggestAccount')
export class SuggestAccountController {
  constructor(private readonly suggestAccountService: SuggestAccountService) {}

  //@Get(':id')
  //detail(@Param('id') id: string): Promise<SuggestAccount> {
  //  return this.suggestAccountService.findOne(Number(id));
  //}

  @Get(':id')
  list(@Param('id') id: string): Promise<SuggestAccount[]> {
    return this.suggestAccountService.findAll(Number(id));
  }

  @Post()
  create(@Body() createDto: CreateDto): Promise<SuggestAccount> {
    return this.suggestAccountService.create(createDto);
  }

  @Patch()
  update(@Body() updateDto: UpdateDto): Promise<SuggestAccount> {
    return this.suggestAccountService.update(updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.suggestAccountService.remove(Number(id));
  }

  //   @Get()
  //   findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
  //     paginationDto.page = Number(paginationDto.page);
  //     paginationDto.limit = Number(paginationDto.limit);
  //     // return this.actorService.findAll({
  //     //   ...paginationDto,
  //     //   limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
  //     // });
  //   }
}

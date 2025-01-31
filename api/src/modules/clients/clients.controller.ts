import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { SearchTermDto } from 'src/shared/dto/search-term.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { IClientsService } from './interfaces/clients-service.interface';

@Controller('clients')
export class ClientsController {
  constructor(
    @Inject(IClientsService) private readonly clientsService: IClientsService,
  ) {}

  @Get('/search')
  findAllBySearchTerm(
    @ActiveUserId() userId: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') searchTerm: string,
  ) {
    const searchTermDto = new SearchTermDto(searchTerm);

    return this.clientsService.findAllBySearchTerm(
      userId,
      searchTermDto,
      page,
      perPage,
    );
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.clientsService.findAllByUserId(userId, page, perPage);
  }

  @Get(':clientId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
  ) {
    return this.clientsService.findOneByUserId(userId, clientId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(userId, createClientDto);
  }

  @Put(':clientId')
  update(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(userId, clientId, updateClientDto);
  }

  @Delete(':clientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
  ) {
    return this.clientsService.remove(userId, clientId);
  }
}

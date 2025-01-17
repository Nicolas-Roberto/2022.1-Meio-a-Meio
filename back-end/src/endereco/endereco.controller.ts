import { CreateEnderecoDto } from './dto/endereco.create.dto';
import { EnderecoService } from './endereco.service';
import { Endereco } from './endereco.entity';
import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly service: EnderecoService) {}

  @Post()
  async create(@Body() data: CreateEnderecoDto) {
    return this.service.create(data);
  }

  @Get()
  async findAllAddress(): Promise<Endereco[]> {
    return this.service.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateEnderecoDto) {
    return this.service.update(id, data);
  }
}
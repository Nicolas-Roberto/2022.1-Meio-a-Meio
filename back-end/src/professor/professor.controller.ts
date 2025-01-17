import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create.professor.dto';
import { UpdateProfessorDto } from './dto/update.professor.dto';
import { ProfessorService } from './professor.service';
import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly service: ProfessorService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.service.create(createProfessorDto);
  }

  @Get()
  async findAllProfessors(): Promise<Professor[]> {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateProfessorDto) {
    return this.service.updateProfessor(id, data);
  }
}
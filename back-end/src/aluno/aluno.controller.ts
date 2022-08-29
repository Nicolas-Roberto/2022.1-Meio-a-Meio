import { AlunoService } from './aluno.service';
import { CreateAlunoDto} from './dto/aluno.create.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly service: AlunoService) {}

  @Post('create')
  async create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.service.create(createAlunoDto);
  }
}
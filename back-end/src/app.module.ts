import { AdministradorModule } from './administrador/administrador.module';
import { DiarioDeAulaModule } from './diario_de_aula/diario_de_aula.module';
import { AtividadeModule } from './atividade/atividade.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './professor/professor.module';
import { AlunoModule } from './aluno/aluno.module';
import { TurmaModule } from './turma/turma.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { CursoModule } from './curso/curso.module';
import { EnderecoModule } from './endereco/endereco.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AdministradorModule, AlunoModule, ProfessorModule, TurmaModule, DisciplinaModule, CursoModule, EnderecoModule, AtividadeModule, DiarioDeAulaModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
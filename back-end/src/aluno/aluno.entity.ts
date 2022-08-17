import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//classe para que se declare que existe um usuario e o que ele é no db
@Entity() //no mysql vira uma tabela
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 9 })
  matricula: string;

  @Column({ length: 100 })
  nome_completo: string;

  @Column({ length: 20 })
  genero: string;

  @Column({ type: 'date' })
  data_de_nascimento: string;

  @Column({ length: 30 })
  nacionalidade: string;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  rg_rne: number;

  @Column({ length: 2 })
  uf_rg_rne: string;

  @Column({ length: 10 })
  orgao_emissor: string;

  @Column()
  ddd: string;

  @Column()
  celular: string;

  @Column()
  crm: string;

  @Column({ length: 2 })
  uf_crm: string;

  @Column({ length: 30 })
  formacao_academica: string;

  @Column({ length: 30 })
  especializacao: string;

  @Column({ length: 50 })
  status_financeiro: string;

  @Column({ length: 100, nullable: true })
  observacao: string;

  @Column({ type: 'date' })
  createAt: Date;

  @Column({ type: 'date' })
  updateAt: Date;
}
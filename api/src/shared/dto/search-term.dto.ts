import { IsNotEmpty, IsString } from 'class-validator';

export class SearchTermDto {
  @IsString()
  @IsNotEmpty({ message: 'O termo de pesquisa é obrigatório.' })
  query: string;

  constructor(query: string) {
    this.query = query;
  }
}

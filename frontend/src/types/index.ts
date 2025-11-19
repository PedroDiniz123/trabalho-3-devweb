export interface Inscricao {
  id: number;
  alunoId: number;
  turmaId: number;
  dataHora: string;
}

export interface Turma {
  id: number;
  nome: string;
  professorId: number;
  ano: number;
  periodo: number;
}

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  CPF: string;
  inscricoes: Inscricao[];
}

export interface Professor {
  id: number;
  nome: string;
  email: string;
  turmas: Turma[];
}

export interface Disciplina {
  id: number;
  nome: string;
  codigo: string;
  cargaHoraria: number;
}

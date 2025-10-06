import axios from 'axios';
import { Aluno, Professor, Turma, Inscricao } from '../types';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const apiService = {
  // Alunos
  getAlunos: async (): Promise<Aluno[]> => {
    const response = await api.get('/alunos');
    return response.data;
  },

  getAluno: async (id: number): Promise<Aluno> => {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  },

  // Professores
  getProfessores: async (): Promise<Professor[]> => {
    const response = await api.get('/professores');
    return response.data;
  },

  getProfessor: async (id: number): Promise<Professor> => {
    const response = await api.get(`/professores/${id}`);
    return response.data;
  },

  // Turmas
  getTurmas: async (): Promise<Turma[]> => {
    const response = await api.get('/turmas');
    return response.data;
  },

  getTurma: async (id: number): Promise<Turma> => {
    const response = await api.get(`/turmas/${id}`);
    return response.data;
  },

  // Inscrições
  getInscricoes: async (): Promise<Inscricao[]> => {
    const response = await api.get('/inscricoes');
    return response.data;
  },

  getInscricao: async (id: number): Promise<Inscricao> => {
    const response = await api.get(`/inscricoes/${id}`);
    return response.data;
  },

  // Obter alunos inscritos em uma turma específica
  getAlunosPorTurma: async (turmaId: number): Promise<Aluno[]> => {
    const [inscricoes, alunos] = await Promise.all([
      api.get('/inscricoes'),
      api.get('/alunos')
    ]);

    const inscricoesDaTurma = inscricoes.data.filter((inscricao: Inscricao) =>
      inscricao.turmaId === turmaId
    );

    const alunoIds = inscricoesDaTurma.map((inscricao: Inscricao) => inscricao.alunoId);

    return alunos.data.filter((aluno: Aluno) => alunoIds.includes(aluno.id));
  }
};

import { create } from 'zustand';
import { Aluno, Disciplina, Turma, Inscricao } from '../types';

interface InscricaoState {
  disciplinaSelecionada: Disciplina | null;
  turmaSelecionada: Turma | null;
  alunoSelecionado: Aluno | null;

  alunosDisponiveis: Aluno[];
  inscritos: Inscricao[];

  termoPesquisa: string;

  setDisciplinaSelecionada: (disciplina: Disciplina | null) => void;
  setTurmaSelecionada: (turma: Turma | null) => void;
  setAlunoSelecionado: (aluno: Aluno | null) => void;

  setAlunosDisponiveis: (alunos: Aluno[]) => void;
  setInscritos: (inscricoes: Inscricao[]) => void;

  adicionarInscricaoLocal: (inscricao: Inscricao) => void;
  removerAlunoDisponivel: (alunoId: number) => void;

  setTermoPesquisa: (termo: string) => void;
}

export const useInscricaoStore = create<InscricaoState>((set) => ({
  disciplinaSelecionada: null,
  turmaSelecionada: null,
  alunoSelecionado: null,

  alunosDisponiveis: [],
  inscritos: [],

  termoPesquisa: '',

  // Quando muda disciplina, limpa turma, aluno, combos e tabela (regra 5 do enunciado)
  setDisciplinaSelecionada: (disciplina) =>
    set(() => ({
      disciplinaSelecionada: disciplina,
      turmaSelecionada: null,
      alunoSelecionado: null,
      alunosDisponiveis: [],
      inscritos: [],
    })),

  // Quando muda turma, limpa aluno e listas (serão recarregadas via React Query)
  setTurmaSelecionada: (turma) =>
    set(() => ({
      turmaSelecionada: turma,
      alunoSelecionado: null,
      alunosDisponiveis: [],
      inscritos: [],
    })),

  setAlunoSelecionado: (aluno) => set({ alunoSelecionado: aluno }),

  setAlunosDisponiveis: (alunos) => set({ alunosDisponiveis: alunos }),

  // Ordena inscrições descendentemente pelo id (mais recente no topo)
  setInscritos: (inscricoes) =>
    set({
      inscritos: [...inscricoes].sort((a, b) => b.id - a.id),
    }),

  adicionarInscricaoLocal: (inscricao) =>
    set((state) => ({
      inscritos: [inscricao, ...state.inscritos],
    })),

  removerAlunoDisponivel: (alunoId) =>
    set((state) => ({
      alunosDisponiveis: state.alunosDisponiveis.filter((a) => a.id !== alunoId),
      alunoSelecionado:
        state.alunoSelecionado?.id === alunoId ? null : state.alunoSelecionado,
    })),

  setTermoPesquisa: (termo) => set({ termoPesquisa: termo }),
}));

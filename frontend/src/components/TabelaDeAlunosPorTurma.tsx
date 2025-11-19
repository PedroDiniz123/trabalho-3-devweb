import React, { useEffect, useState } from 'react';
import { Table, Alert, Button } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useInscricaoStore } from '../store/inscricaoStore';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onAnterior: () => void;
  onProxima: () => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({
  paginaAtual,
  totalPaginas,
  onAnterior,
  onProxima,
}) => (
  <div className="d-flex justify-content-between align-items-center mt-3">
    <Button
      variant="outline-primary"
      size="sm"
      disabled={paginaAtual <= 1}
      onClick={onAnterior}
    >
      ← Anterior
    </Button>
    <span className="text-muted small">
      Página {paginaAtual} de {totalPaginas || 1}
    </span>
    <Button
      variant="outline-primary"
      size="sm"
      disabled={paginaAtual >= totalPaginas || totalPaginas === 0}
      onClick={onProxima}
    >
      Próxima →
    </Button>
  </div>
);

const TabelaDeAlunosPorTurma: React.FC = () => {
  const {
    turmaSelecionada,
    termoPesquisa,
  } = useInscricaoStore();

  const turmaId = turmaSelecionada?.id ?? null;
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const queryClient = useQueryClient();

  const { data: inscricoesRemotas = [], isLoading, isError } = useQuery({
    queryKey: ['inscricoesPorTurma', turmaId],
    queryFn: () => apiService.getInscricoesPorTurma(turmaId!),
    enabled: turmaId !== null,
  });

  // Buscar todos os alunos para fazer o join com as inscrições
  const { data: todosAlunos = [] } = useQuery({
    queryKey: ['alunos'],
    queryFn: () => apiService.getAlunos(),
  });

  useEffect(() => {
    if (turmaId) {
      setPaginaAtual(1);
    }
  }, [turmaId]);

  // Combinar inscrições com dados dos alunos
  const inscricoesComAlunos = inscricoesRemotas.map((inscricao) => {
    const aluno = todosAlunos.find((a) => a.id === inscricao.alunoId);
    return {
      ...inscricao,
      aluno,
    };
  });

  // Filtro em memória pelo termoPesquisa (filtrando por nome ou email do aluno)
  const inscritosFiltrados = termoPesquisa.trim() === ''
    ? inscricoesComAlunos
    : inscricoesComAlunos.filter((i) =>
        i.aluno?.nome.toLowerCase().includes(termoPesquisa.trim().toLowerCase()) ||
        i.aluno?.email.toLowerCase().includes(termoPesquisa.trim().toLowerCase())
      );

  const totalPaginas = Math.ceil(inscritosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const pagina = inscritosFiltrados.slice(inicio, inicio + itensPorPagina);

  if (!turmaId) {
    return (
      <Alert variant="info" className="mt-3">
        Selecione uma turma para ver os alunos inscritos.
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Alert variant="secondary" className="mt-3">
        Carregando alunos inscritos...
      </Alert>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger" className="mt-3">
        Erro ao carregar inscrições.
      </Alert>
    );
  }

  if (inscritosFiltrados.length === 0) {
    return (
      <Alert variant="secondary" className="mt-3">
        Nenhum aluno inscrito nesta turma.
      </Alert>
    );
  }

  return (
    <>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {pagina.map((inscricao) => (
            <tr key={inscricao.id}>
              <td>{inscricao.aluno?.id || inscricao.alunoId}</td>
              <td>{inscricao.aluno?.nome || '-'}</td>
              <td>{inscricao.aluno?.email || '-'}</td>
              <td>{inscricao.aluno?.CPF || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onAnterior={() => setPaginaAtual((p) => Math.max(1, p - 1))}
        onProxima={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
      />
    </>
  );
};

export default TabelaDeAlunosPorTurma;

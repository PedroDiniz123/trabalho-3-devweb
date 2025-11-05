import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Aluno, Turma } from '../types';
import { Container, Table, Form } from 'react-bootstrap';

const GrupoAlunosPage: React.FC = () => {
  const [selectedTurmaId, setSelectedTurmaId] = useState<number | null>(null);
  const [grupoAlunos, setGrupoAlunos] = useState<number[]>([]);

  // Fetch all turmas using React Query
  const { data: turmas = [], isLoading: isLoadingTurmas } = useQuery({
    queryKey: ['turmas'],
    queryFn: apiService.getTurmas
  });

  // Fetch alunos for selected turma using React Query
  const { data: alunos = [], isLoading: isLoadingAlunos } = useQuery({
    queryKey: ['alunos', selectedTurmaId],
    queryFn: () => apiService.getAlunosPorTurma(selectedTurmaId!),
    enabled: selectedTurmaId !== null
  });

  // Load grupo from localStorage when turma changes
  useEffect(() => {
    if (selectedTurmaId !== null) {
      const turma = turmas.find(t => t.id === selectedTurmaId);
      if (turma) {
        const savedGrupo = localStorage.getItem(turma.nome);
        if (savedGrupo) {
          setGrupoAlunos(JSON.parse(savedGrupo));
        } else {
          setGrupoAlunos([]);
        }
      }
    } else {
      setGrupoAlunos([]);
    }
  }, [selectedTurmaId, turmas]);

  const handleTurmaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '') {
      setSelectedTurmaId(null);
    } else {
      setSelectedTurmaId(Number(value));
    }
  };

  const toggleAlunoInGrupo = (alunoId: number) => {
    if (selectedTurmaId === null) return;

    const turma = turmas.find(t => t.id === selectedTurmaId);
    if (!turma) return;

    let newGrupo: number[];
    if (grupoAlunos.includes(alunoId)) {
      // Remove aluno do grupo
      newGrupo = grupoAlunos.filter(id => id !== alunoId);
    } else {
      // Adiciona aluno ao grupo
      newGrupo = [...grupoAlunos, alunoId];
    }

    setGrupoAlunos(newGrupo);
    localStorage.setItem(turma.nome, JSON.stringify(newGrupo));
  };

  const isAlunoInGrupo = (alunoId: number): boolean => {
    return grupoAlunos.includes(alunoId);
  };

  return (
    <Container className="mt-4">
      <h2>Grupos de Alunos por Turma</h2>

      <div className="mb-4 mt-4">
        <Form.Group>
          <Form.Label>Turma:</Form.Label>
          <Form.Select
            value={selectedTurmaId ?? ''}
            onChange={handleTurmaChange}
            disabled={isLoadingTurmas}
          >
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {selectedTurmaId === null ? (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                Selecione uma turma para ver os alunos
              </td>
            </tr>
          ) : isLoadingAlunos ? (
            <tr>
              <td colSpan={4} className="text-center">
                Carregando alunos...
              </td>
            </tr>
          ) : alunos.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                Nenhum aluno inscrito nesta turma
              </td>
            </tr>
          ) : (
            alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      isAlunoInGrupo(aluno.id) ? 'btn-danger' : 'btn-primary'
                    }`}
                    onClick={() => toggleAlunoInGrupo(aluno.id)}
                  >
                    {isAlunoInGrupo(aluno.id) ? 'Remover' : 'Incluir'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default GrupoAlunosPage;


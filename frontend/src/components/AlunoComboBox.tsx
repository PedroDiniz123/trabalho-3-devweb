import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useInscricaoStore } from '../store/inscricaoStore';

const AlunoComboBox: React.FC = () => {
  const {
    turmaSelecionada,
    alunoSelecionado,
    setAlunoSelecionado,
  } = useInscricaoStore();

  const turmaId = turmaSelecionada?.id ?? null;

  const { data: alunos = [], isLoading, isError } = useQuery({
    queryKey: ['alunosNaoInscritos', turmaId],
    queryFn: () => apiService.getAlunosNaoInscritosNaTurma(turmaId!),
    enabled: turmaId !== null,
  });

  useEffect(() => {
    if (!turmaId) {
      setAlunoSelecionado(null);
    }
  }, [turmaId, setAlunoSelecionado]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setAlunoSelecionado(null);
    } else {
      const aluno = alunos.find((a) => a.id === Number(value)) ?? null;
      setAlunoSelecionado(aluno);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Aluno</Form.Label>
      <Form.Select
        value={alunoSelecionado?.id ?? ''}
        onChange={handleChange}
        disabled={!turmaId || isLoading || isError}
      >
        <option value="">Selecione um aluno</option>
        {alunos.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome} ({a.email})
          </option>
        ))}
      </Form.Select>
      {isError && <small className="text-danger">Erro ao carregar alunos.</small>}
    </Form.Group>
  );
};

export default AlunoComboBox;

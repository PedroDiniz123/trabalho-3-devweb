import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useInscricaoStore } from '../store/inscricaoStore';

const TurmaComboBox: React.FC = () => {
  const { disciplinaSelecionada, turmaSelecionada, setTurmaSelecionada } = useInscricaoStore();

  const disciplinaId = disciplinaSelecionada?.id ?? null;

  const { data: turmas = [], isLoading, isError } = useQuery({
    queryKey: ['turmasPorDisciplina', disciplinaId],
    queryFn: () => apiService.getTurmasPorDisciplina(disciplinaId!),
    enabled: disciplinaId !== null,
  });

  useEffect(() => {
    // sempre que trocar disciplina, limpar turma
    setTurmaSelecionada(null);
  }, [disciplinaId, setTurmaSelecionada]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setTurmaSelecionada(null);
    } else {
      const turma = turmas.find((t) => t.id === Number(value)) ?? null;
      setTurmaSelecionada(turma);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Turma</Form.Label>
      <Form.Select
        value={turmaSelecionada?.id ?? ''}
        onChange={handleChange}
        disabled={!disciplinaId || isLoading || isError}
      >
        <option value="">Selecione uma turma</option>
        {disciplinaId &&
          turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} ({t.ano}/{t.periodo})
            </option>
          ))}
      </Form.Select>
      {isError && <small className="text-danger">Erro ao carregar turmas.</small>}
    </Form.Group>
  );
};

export default TurmaComboBox;

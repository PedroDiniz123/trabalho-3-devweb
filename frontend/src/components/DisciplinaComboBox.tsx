import React from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useInscricaoStore } from '../store/inscricaoStore';

const DisciplinaComboBox: React.FC = () => {
  const { data: disciplinas = [], isLoading, isError } = useQuery({
    queryKey: ['disciplinas'],
    queryFn: apiService.getDisciplinas,
  });

  const { disciplinaSelecionada, setDisciplinaSelecionada } = useInscricaoStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setDisciplinaSelecionada(null);
    } else {
      const disciplina = disciplinas.find((d: any) => d.id === Number(value)) ?? null;
      setDisciplinaSelecionada(disciplina);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Disciplina</Form.Label>
      <Form.Select
        value={disciplinaSelecionada?.id ?? ''}
        onChange={handleChange}
        disabled={isLoading || isError}
      >
        <option value="">Selecione uma disciplina</option>
        {isLoading && <option>Carregando...</option>}
        {!isLoading &&
          disciplinas.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
      </Form.Select>
      {isError && <small className="text-danger">Erro ao carregar disciplinas.</small>}
    </Form.Group>
  );
};

export default DisciplinaComboBox;

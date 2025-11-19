import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Card } from 'react-bootstrap';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Aluno } from '../types';
import { apiService } from '../services/api';

const alunoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  CPF: z
    .string()
    .min(11, 'CPF deve ter pelo menos 11 dígitos')
    .max(14, 'CPF muito longo'),
});

type AlunoFormValues = z.infer<typeof alunoSchema>;

interface AlunoFormProps {
  initialData?: Aluno;
  onSubmitSuccess: (aluno: Aluno) => void;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ initialData, onSubmitSuccess }) => {
  const [values, setValues] = useState<AlunoFormValues>({
    nome: initialData?.nome ?? '',
    email: initialData?.email ?? '',
    CPF: initialData?.CPF ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AlunoFormValues, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialData) {
      setValues({
        nome: initialData.nome,
        email: initialData.email,
        CPF: initialData.CPF,
      });
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: async (data: AlunoFormValues) => {
      if (initialData) {
        return apiService.updateAluno(initialData.id, data);
      }
      return apiService.createAluno(data);
    },
    onSuccess: (aluno) => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
      onSubmitSuccess(aluno);
    },
    onError: () => {
      setFormError('Erro ao salvar aluno. Verifique se a API está rodando.');
    },
  });

  const handleChange =
    (field: keyof AlunoFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setErrors({});

    const result = alunoSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AlunoFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AlunoFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate(result.data);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{initialData ? 'Editar Aluno' : 'Cadastrar Aluno'}</Card.Title>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={values.nome}
              onChange={handleChange('nome')}
              isInvalid={!!errors.nome}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nome}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              value={values.CPF}
              onChange={handleChange('CPF')}
              isInvalid={!!errors.CPF}
            />
            <Form.Control.Feedback type="invalid">
              {errors.CPF}
            </Form.Control.Feedback>
          </Form.Group>

          {formError && (
            <Alert variant="danger" className="mt-2">
              {formError}
            </Alert>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Spinner size="sm" className="me-2" /> Salvando...
              </>
            ) : initialData ? (
              'Salvar Alterações'
            ) : (
              'Cadastrar Aluno'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AlunoForm;

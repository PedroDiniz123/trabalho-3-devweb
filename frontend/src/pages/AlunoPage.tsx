import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Aluno } from '../types';

interface AlunoPageProps {
  aluno?: Aluno | null;
}

const AlunoPage: React.FC<AlunoPageProps> = ({ aluno }) => {
  if (!aluno) {
    return (
      <Alert variant="info">
        Nenhum aluno selecionado ainda. Preencha o formulário e salve.
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-primary">Aluno Cadastrado/Alterado</Card.Title>
        <p><strong>ID:</strong> {aluno.id}</p>
        <p><strong>Nome:</strong> {aluno.nome}</p>
        <p><strong>Email:</strong> {aluno.email}</p>
        <p><strong>CPF:</strong> {aluno.CPF}</p>
        <p><strong>Qtd. de Inscrições:</strong> {aluno.inscricoes?.length ?? 0}</p>
      </Card.Body>
    </Card>
  );
};

export default AlunoPage;

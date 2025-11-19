import React from 'react';
import { Container } from 'react-bootstrap';
import InscricaoForm from '../components/InscricaoForm';

const InscricaoPage: React.FC = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Inscrição de Alunos em Turmas</h1>
      <InscricaoForm />
    </Container>
  );
};

export default InscricaoPage;

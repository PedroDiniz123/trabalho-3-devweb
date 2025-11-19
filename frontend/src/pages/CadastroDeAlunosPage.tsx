import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Aluno } from '../types';
import AlunoForm from '../components/AlunoForm';
import AlunoPage from './AlunoPage';

const CadastroDeAlunosPage: React.FC = () => {
  const [alunoAtual, setAlunoAtual] = useState<Aluno | null>(null);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Cadastro de Alunos</h1>
      <Row>
        <Col md={6}>
          <AlunoForm onSubmitSuccess={setAlunoAtual} />
        </Col>
        <Col md={6}>
          {alunoAtual && <AlunoPage aluno={alunoAtual} />}
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroDeAlunosPage;

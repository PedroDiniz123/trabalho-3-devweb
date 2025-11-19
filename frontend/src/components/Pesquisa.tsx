import React from 'react';
import { Form } from 'react-bootstrap';
import { useInscricaoStore } from '../store/inscricaoStore';

const Pesquisa: React.FC = () => {
  const { termoPesquisa, setTermoPesquisa } = useInscricaoStore();

  return (
    <Form.Group className="mb-3">
      <Form.Label>Pesquisar alunos (na turma atual)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite para filtrar..."
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />
    </Form.Group>
  );
};

export default Pesquisa;

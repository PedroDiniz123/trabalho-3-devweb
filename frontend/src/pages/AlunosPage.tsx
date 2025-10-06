import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { Aluno } from '../types';
import { apiService } from '../services/api';

const AlunosPage: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAlunos();
        setAlunos(data);
      } catch (err) {
        setError('Erro ao carregar alunos. Verifique se a API está rodando.');
        console.error('Erro ao buscar alunos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" className="me-2" />
        <span>Carregando alunos...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Erro!</Alert.Heading>
          <p>{error}</p>
          <hr />
          <small>Certifique-se de que sua API está rodando em http://localhost:8081</small>
        </Alert>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-dark">Lista de Alunos</h1>

      {alunos.length === 0 ? (
        <Alert variant="info" className="text-center py-5">
          Nenhum aluno encontrado.
        </Alert>
      ) : (
        <>
          <Row>
            {alunos.map((aluno) => (
              <Col lg={4} md={6} sm={12} className="mb-3" key={aluno.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-primary">{aluno.nome}</Card.Title>
                    <Card.Text className="mb-2">
                      <strong>📧 Email:</strong> {aluno.email}
                    </Card.Text>
                    <Card.Text className="mb-0">
                      <strong>📚 Inscrições:</strong> {aluno.inscricoes.length} turma(s)
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4 text-muted">
            <small>Total de alunos: {alunos.length}</small>
          </div>
        </>
      )}
    </Container>
  );
};

export default AlunosPage;

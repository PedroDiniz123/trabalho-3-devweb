import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Turma } from '../types';
import { apiService } from '../services/api';

const TurmasPage: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getTurmas();
        setTurmas(data);
      } catch (err) {
        setError('Erro ao carregar turmas. Verifique se a API está rodando.');
        console.error('Erro ao buscar turmas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, []);

  const handleTurmaClick = (turmaId: number) => {
    navigate(`/turma/${turmaId}`);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" className="me-2" />
        <span>Carregando turmas...</span>
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
      <h1 className="mb-4 text-dark">Lista de Turmas</h1>

      {turmas.length === 0 ? (
        <Alert variant="info" className="text-center py-5">
          Nenhuma turma encontrada.
        </Alert>
      ) : (
        <>
          <Row>
            {turmas.map((turma) => (
              <Col lg={6} md={12} className="mb-3" key={turma.id}>
                <Card
                  className="h-100 shadow-sm cursor-pointer"
                  onClick={() => handleTurmaClick(turma.id)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Card.Body>
                    <Card.Title className="text-primary mb-3">
                      {turma.nome}
                    </Card.Title>

                    <Row className="mb-3">
                      <Col xs={6}>
                        <Card.Text className="mb-1">
                          <strong>📅 Ano:</strong> {turma.ano}
                        </Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text className="mb-1">
                          <strong>📆 Período:</strong> {turma.periodo}
                        </Card.Text>
                      </Col>
                    </Row>

                    <Card.Text className="mb-2">
                      <strong>👨‍🏫 Professor ID:</strong> {turma.professorId}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg="secondary" className="me-2">
                          ID: {turma.id}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-center mt-3 p-2 bg-light rounded">
                      <small className="text-primary">
                        ✏️ Clique para ver detalhes
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4 text-muted">
            <small>Total de turmas: {turmas.length}</small>
          </div>
        </>
      )}
    </Container>
  );
};

export default TurmasPage;

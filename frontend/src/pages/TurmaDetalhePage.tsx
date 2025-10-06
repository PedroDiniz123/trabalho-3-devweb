import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Turma, Aluno } from '../types';
import { apiService } from '../services/api';

const TurmaDetalhePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [turma, setTurma] = useState<Turma | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurmaDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const turmaId = parseInt(id);

        // Buscar dados da turma e alunos inscritos
        const [turmaData, alunosData] = await Promise.all([
          apiService.getTurma(turmaId),
          apiService.getAlunosPorTurma(turmaId)
        ]);

        setTurma(turmaData);
        setAlunos(alunosData);

      } catch (err) {
        setError('Erro ao carregar detalhes da turma. Verifique se a API está rodando.');
        console.error('Erro ao buscar detalhes da turma:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurmaDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" className="me-2" />
        <span>Carregando detalhes da turma...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Button
          variant="secondary"
          className="mb-4"
          onClick={() => navigate('/turmas')}
        >
          ← Voltar para Turmas
        </Button>

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

  if (!turma) {
    return (
      <Container className="py-4">
        <Button
          variant="secondary"
          className="mb-4"
          onClick={() => navigate('/turmas')}
        >
          ← Voltar para Turmas
        </Button>

        <Alert variant="info" className="text-center py-5">
          Turma não encontrada
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => navigate('/turmas')}
      >
        ← Voltar para Turmas
      </Button>

      <h1 className="mb-4 text-dark">Detalhes da Turma</h1>

      {/* Card principal com informações da turma */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="text-primary mb-3 fs-2">
            {turma.nome}
          </Card.Title>

          <Row>
            <Col md={6} className="mb-3">
              <Card className="bg-light h-100">
                <Card.Body>
                  <Card.Text className="mb-2">
                    <strong>📅 Ano:</strong> {turma.ano}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    <strong>📆 Período:</strong> {turma.periodo}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="bg-light h-100">
                <Card.Body>
                  <Card.Text className="mb-2">
                    <strong>🆔 ID da Turma:</strong>
                    <Badge bg="secondary" className="ms-2">
                      {turma.id}
                    </Badge>
                  </Card.Text>
                  <Card.Text className="mb-0">
                    <strong>👨‍🏫 Professor ID:</strong>
                    <Badge bg="info" className="ms-2">
                      {turma.professorId}
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Card com lista de alunos */}
      <Card className="shadow-sm">
        <Card.Header>
          <h3 className="mb-0 d-flex align-items-center">
            👥 Alunos Inscritos
            <Badge bg="primary" className="ms-2">
              {alunos.length}
            </Badge>
          </h3>
        </Card.Header>

        <Card.Body>
          {alunos.length === 0 ? (
            <Alert variant="secondary" className="text-center py-4 mb-0">
              📝 Nenhum aluno inscrito nesta turma.
            </Alert>
          ) : (
            <Row>
              {alunos.map((aluno) => (
                <Col lg={4} md={6} sm={12} className="mb-3" key={aluno.id}>
                  <Card className="border-light bg-light">
                    <Card.Body>
                      <Card.Title className="text-primary fs-6">
                        👤 {aluno.nome}
                      </Card.Title>
                      <Card.Text className="mb-1 small">
                        <strong>📚 Inscrições:</strong> {aluno.inscricoes.length} turma(s)
                      </Card.Text>
                      <Card.Text className="mb-0 small">
                        <strong>📧 Email:</strong> {aluno.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TurmaDetalhePage;

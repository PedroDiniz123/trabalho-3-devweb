import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    Button,
    Spinner,
    Badge,
    Form,
    InputGroup,
} from 'react-bootstrap';
import { Turma, Aluno, Professor } from '../types';
import { apiService } from '../services/api';

const TurmasPage: React.FC = () => {
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [professor, setProfessor] = useState<Professor | null>(null);
    const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
    const [loadingTurmas, setLoadingTurmas] = useState(true);
    const [loadingDetalhe, setLoadingDetalhe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const [paginaAtual, setPaginaAtual] = useState(1);
    const alunosPorPagina = 6;

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                setLoadingTurmas(true);
                const data = await apiService.getTurmas();
                setTurmas(data);
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar turmas. Verifique se a API está rodando.');
            } finally {
                setLoadingTurmas(false);
            }
        };
        fetchTurmas();
    }, []);

    const handleTurmaClick = async (turma: Turma) => {
        if (turmaSelecionada?.id === turma.id) return;

        try {
            setLoadingDetalhe(true);
            setError(null);
            setTurmaSelecionada(turma);
            setPaginaAtual(1);

            const [alunosData, professorData] = await Promise.all([
                apiService.getAlunosPorTurma(turma.id),
                apiService.getProfessor(turma.professorId),
            ]);

            setAlunos(alunosData);
            setProfessor(professorData);
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar detalhes da turma.');
        } finally {
            setLoadingDetalhe(false);
        }
    };

    const filteredTurmas =
        search.trim() === ''
            ? [] // se o campo de busca estiver vazio, lista vazia
            : turmas.filter((t) =>
                t.nome.toLowerCase().includes(search.toLowerCase())
            );


    const totalPaginas = Math.ceil(alunos.length / alunosPorPagina);
    const indexInicial = (paginaAtual - 1) * alunosPorPagina;
    const indexFinal = indexInicial + alunosPorPagina;
    const alunosPagina = alunos.slice(indexInicial, indexFinal);

    const handlePaginaAnterior = () => {
        if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
    };

    const handlePaginaProxima = () => {
        if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
    };

    if (loadingTurmas) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Carregando turmas...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Erro!</Alert.Heading>
                    <p>{error}</p>
                    <hr />
                    <small>Verifique se a API está rodando em http://localhost:8081</small>
                </Alert>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Tentar novamente
                </Button>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <h1 className="mb-4 text-dark">Turmas</h1>

            <Row>
                {}
                <Col lg={4} md={5} sm={12} className="mb-4">
                    <Card className="shadow-sm h-100">
                        <Card.Header>
                            <h5 className="mb-3">📚 Lista de Turmas</h5>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Pesquisar turma..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </InputGroup>
                        </Card.Header>

                        <Card.Body
                            className="overflow-auto"
                            style={{ maxHeight: '65vh', padding: '0.75rem' }}
                        >
                            {search.trim() === '' ? (
                                <Alert variant="info" className="text-center mb-0">
                                    🔍 Digite algo para buscar uma turma.
                                </Alert>
                            ) : filteredTurmas.length === 0 ? (
                                <Alert variant="secondary" className="text-center mb-0">
                                    Nenhuma turma encontrada para "{search}".
                                </Alert>
                            ) : (
                                filteredTurmas.map((turma) => (
                                    <Card
                                        key={turma.id}
                                        className={`mb-2 cursor-pointer ${
                                            turmaSelecionada?.id === turma.id
                                                ? 'border-primary'
                                                : 'border-light'
                                        }`}
                                        onClick={() => handleTurmaClick(turma)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.transform = 'translateY(-2px)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.transform = 'translateY(0)')
                                        }
                                    >
                                        <Card.Body>
                                            <Card.Title className="text-primary mb-2 fs-6">
                                                {turma.nome}
                                            </Card.Title>
                                            <div className="small text-muted">
                                                Ano: {turma.ano} • Período: {turma.periodo}
                                            </div>
                                            <Badge bg="secondary" className="mt-2">
                                                ID {turma.id}
                                            </Badge>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {}
                <Col lg={8} md={7} sm={12}>
                    {!turmaSelecionada ? (
                        <Alert variant="info" className="text-center py-5">
                            Selecione uma turma à esquerda para ver os detalhes.
                        </Alert>
                    ) : (
                        <Card className="shadow-sm h-100">
                            <Card.Header className="bg-white">
                                <h4 className="text-primary mb-0">{turmaSelecionada.nome}</h4>
                            </Card.Header>

                            <Card.Body>
                                {loadingDetalhe ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" variant="primary" />
                                        <p className="mt-3">Carregando alunos...</p>
                                    </div>
                                ) : (
                                    <>
                                        <Row className="mb-4">
                                            <Col md={4}>
                                                <Card className="bg-light">
                                                    <Card.Body>
                                                        <strong>📅 Ano:</strong> {turmaSelecionada.ano}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={4}>
                                                <Card className="bg-light">
                                                    <Card.Body>
                                                        <strong>📆 Período:</strong>{' '}
                                                        {turmaSelecionada.periodo}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={4}>
                                                <Card className="bg-light">
                                                    <Card.Body>
                                                        <strong>👨‍🏫 Professor:</strong>{' '}
                                                        {professor ? professor.nome : 'Carregando...'}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>

                                        <h5 className="mb-3">
                                            👥 Alunos Inscritos{' '}
                                            <Badge bg="primary">{alunos.length}</Badge>
                                        </h5>

                                        {alunos.length === 0 ? (
                                            <Alert variant="secondary" className="text-center">
                                                Nenhum aluno inscrito nesta turma.
                                            </Alert>
                                        ) : (
                                            <>
                                                <Row>
                                                    {alunosPagina.map((aluno) => (
                                                        <Col
                                                            lg={4}
                                                            md={6}
                                                            sm={12}
                                                            className="mb-3"
                                                            key={aluno.id}
                                                        >
                                                            <Card className="border-light bg-light">
                                                                <Card.Body>
                                                                    <Card.Title className="fs-6 text-primary">
                                                                        👤 {aluno.nome}
                                                                    </Card.Title>
                                                                    <Card.Text className="small mb-1">
                                                                        <strong>🆔 ID:</strong> {aluno.id}
                                                                    </Card.Text>
                                                                    <Card.Text className="small mb-1">
                                                                        <strong>🧾 CPF:</strong> {aluno.CPF}
                                                                    </Card.Text>
                                                                    <Card.Text className="small mb-1">
                                                                        <strong>📚 Inscrições:</strong>{' '}
                                                                        {aluno.inscricoes.length}
                                                                    </Card.Text>
                                                                    <Card.Text className="small mb-0">
                                                                        <strong>📧</strong> {aluno.email}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>

                                                {}
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={handlePaginaAnterior}
                                                        disabled={paginaAtual === 1}
                                                    >
                                                        ← Anterior
                                                    </Button>
                                                    <span className="text-muted small">
                            Página {paginaAtual} de {totalPaginas || 1}
                          </span>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={handlePaginaProxima}
                                                        disabled={
                                                            paginaAtual === totalPaginas ||
                                                            totalPaginas === 0
                                                        }
                                                    >
                                                        Próxima →
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TurmasPage;

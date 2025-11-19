import React from 'react';
import { Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useInscricaoStore } from '../store/inscricaoStore';
import DisciplinaComboBox from './DisciplinaComboBox';
import TurmaComboBox from './TurmaComboBox';
import AlunoComboBox from './AlunoComboBox';
import Pesquisa from './Pesquisa';
import TabelaDeAlunosPorTurma from './TabelaDeAlunosPorTurma';

const InscricaoForm: React.FC = () => {
  const {
    turmaSelecionada,
    alunoSelecionado,
    adicionarInscricaoLocal,
    removerAlunoDisponivel,
  } = useInscricaoStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      apiService.createInscricao({
        alunoId: alunoSelecionado!.id,
        turmaId: turmaSelecionada!.id,
      }),
    onSuccess: (inscricao) => {
      adicionarInscricaoLocal(inscricao);
      removerAlunoDisponivel(inscricao.alunoId);
      queryClient.invalidateQueries({
        queryKey: ['inscricoesPorTurma', turmaSelecionada?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['alunosNaoInscritos', turmaSelecionada?.id],
      });
    },
  });

  const handleInscrever = () => {
    if (!turmaSelecionada || !alunoSelecionado) return;
    mutation.mutate();
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Inscrição de Aluno em Turma</Card.Title>

        <Row>
          <Col md={4}>
            <DisciplinaComboBox />
          </Col>
          <Col md={4}>
            <TurmaComboBox />
          </Col>
          <Col md={4}>
            <AlunoComboBox />
          </Col>
        </Row>

        <Button
          className="mt-2"
          disabled={!turmaSelecionada || !alunoSelecionado || mutation.isPending}
          onClick={handleInscrever}
        >
          {mutation.isPending ? 'Inscrevendo...' : 'Inscrever Aluno'}
        </Button>

        {mutation.isError && (
          <Alert variant="danger" className="mt-2">
            Erro ao inscrever aluno. Verifique se a API está rodando.
          </Alert>
        )}

        {mutation.isSuccess && (
          <Alert variant="success" className="mt-2">
            Aluno inscrito com sucesso!
          </Alert>
        )}

        <hr className="my-4" />

        <Pesquisa />
        <TabelaDeAlunosPorTurma />
      </Card.Body>
    </Card>
  );
};

export default InscricaoForm;

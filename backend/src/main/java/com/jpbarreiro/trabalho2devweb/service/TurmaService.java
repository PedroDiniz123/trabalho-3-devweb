package com.jpbarreiro.trabalho2devweb.service;

import com.jpbarreiro.trabalho2devweb.dto.AlunoDTO;
import com.jpbarreiro.trabalho2devweb.dto.TurmaDTO;
import com.jpbarreiro.trabalho2devweb.exception.ResourceNotFoundException;
import com.jpbarreiro.trabalho2devweb.model.Disciplina;
import com.jpbarreiro.trabalho2devweb.model.Professor;
import com.jpbarreiro.trabalho2devweb.model.Turma;
import com.jpbarreiro.trabalho2devweb.repository.AlunoRepository;
import com.jpbarreiro.trabalho2devweb.repository.DisciplinaRepository;
import com.jpbarreiro.trabalho2devweb.repository.InscricaoRepository;
import com.jpbarreiro.trabalho2devweb.repository.ProfessorRepository;
import com.jpbarreiro.trabalho2devweb.repository.TurmaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;
    private final ProfessorRepository professorRepository;
    private final DisciplinaRepository disciplinaRepository;
    private final InscricaoRepository inscricaoRepository;
    private final AlunoRepository alunoRepository;

    public TurmaService(TurmaRepository turmaRepository, 
                       ProfessorRepository professorRepository,
                       DisciplinaRepository disciplinaRepository,
                       InscricaoRepository inscricaoRepository,
                       AlunoRepository alunoRepository) {
        this.turmaRepository = turmaRepository;
        this.professorRepository = professorRepository;
        this.disciplinaRepository = disciplinaRepository;
        this.inscricaoRepository = inscricaoRepository;
        this.alunoRepository = alunoRepository;
    }

    public TurmaDTO create(TurmaDTO dto) {
        if (dto.getProfessorId() == null) {
            throw new IllegalArgumentException("É necessário informar o professor da turma");
        }
        if (dto.getDisciplinaId() == null) {
            throw new IllegalArgumentException("É necessário informar a disciplina da turma");
        }
        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome da turma é obrigatório");
        }
        if (dto.getPeriodo() == null || dto.getPeriodo() == 0) {
            throw new IllegalArgumentException("Período da turma é obrigatório");
        }
        if (dto.getAno() == null || dto.getAno() <= 0) {
            throw new IllegalArgumentException("Ano da turma é obrigatório e deve ser maior que zero");
        }

        Professor professor = professorRepository.findById(dto.getProfessorId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Professor não encontrado com id " + dto.getProfessorId()));

        Disciplina disciplina = disciplinaRepository.findById(dto.getDisciplinaId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Disciplina não encontrada com id " + dto.getDisciplinaId()));

        Turma turma = new Turma();
        turma.setProfessor(professor);
        turma.setDisciplina(disciplina);
        turma.setNome(dto.getNome());
        turma.setPeriodo(dto.getPeriodo());
        turma.setAno(dto.getAno());

        Turma saved = turmaRepository.save(turma);
        return new TurmaDTO(saved);
    }

    public void delete(Long id) {
        if (!turmaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Turma não encontrada com id " + id);
        }
        turmaRepository.deleteById(id);
    }

    public TurmaDTO findById(Long id) {
        Turma turma = turmaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com id " + id));
        return new TurmaDTO(turma);
    }

    public List<TurmaDTO> findAll() {
        return turmaRepository.findAll()
                .stream()
                .map(TurmaDTO::new)
                .collect(Collectors.toList());
    }

    public List<AlunoDTO> getAlunosByTurma(Long turmaId) {
        if (!turmaRepository.existsById(turmaId)) {
            throw new ResourceNotFoundException("Turma não encontrada com id " + turmaId);
        }

        return inscricaoRepository.findByTurmaId(turmaId)
                .stream()
                .map(inscricao -> new AlunoDTO(inscricao.getAluno()))
                .collect(Collectors.toList());
    }

    public List<TurmaDTO> findByDisciplinaId(Long disciplinaId) {
        return turmaRepository.findByDisciplinaId(disciplinaId)
                .stream()
                .map(TurmaDTO::new)
                .collect(Collectors.toList());
    }

    public List<AlunoDTO> getAlunosNaoInscritos(Long turmaId) {
        if (!turmaRepository.existsById(turmaId)) {
            throw new ResourceNotFoundException("Turma não encontrada com id " + turmaId);
        }

        // Pegar IDs dos alunos já inscritos
        Set<Long> alunosInscritosIds = inscricaoRepository.findByTurmaId(turmaId)
                .stream()
                .map(inscricao -> inscricao.getAluno().getId())
                .collect(Collectors.toSet());

        // Retornar alunos que não estão inscritos
        return alunoRepository.findAll()
                .stream()
                .filter(aluno -> !alunosInscritosIds.contains(aluno.getId()))
                .map(AlunoDTO::new)
                .collect(Collectors.toList());
    }
}

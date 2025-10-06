package com.jpbarreiro.trabalho2devweb.service;

import com.jpbarreiro.trabalho2devweb.dto.InscricaoDTO;
import com.jpbarreiro.trabalho2devweb.exception.ResourceNotFoundException;
import com.jpbarreiro.trabalho2devweb.model.Aluno;
import com.jpbarreiro.trabalho2devweb.model.Inscricao;
import com.jpbarreiro.trabalho2devweb.model.Turma;
import com.jpbarreiro.trabalho2devweb.repository.AlunoRepository;
import com.jpbarreiro.trabalho2devweb.repository.InscricaoRepository;
import com.jpbarreiro.trabalho2devweb.repository.TurmaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InscricaoService {

    private final InscricaoRepository inscricaoRepository;
    private final AlunoRepository alunoRepository;
    private final TurmaRepository turmaRepository;

    public InscricaoService(InscricaoRepository inscricaoRepository,
                            AlunoRepository alunoRepository,
                            TurmaRepository turmaRepository) {
        this.inscricaoRepository = inscricaoRepository;
        this.alunoRepository = alunoRepository;
        this.turmaRepository = turmaRepository;
    }

    public InscricaoDTO create(InscricaoDTO dto) {
        if (dto.getAlunoId() == null) {
            throw new IllegalArgumentException("É necessário informar o aluno da inscrição");
        }
        if (dto.getTurmaId() == null) {
            throw new IllegalArgumentException("É necessário informar a turma da inscrição");
        }

        Aluno aluno = alunoRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com id " + dto.getAlunoId()));

        Turma turma = turmaRepository.findById(dto.getTurmaId())
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com id " + dto.getTurmaId()));

        Inscricao inscricao = new Inscricao();
        inscricao.setAluno(aluno);
        inscricao.setTurma(turma);
        inscricao.setDataHora(LocalDateTime.now());

        Inscricao saved = inscricaoRepository.save(inscricao);
        return new InscricaoDTO(saved);
    }

    public void delete(Long id) {
        if (!inscricaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inscrição não encontrada com id " + id);
        }
        inscricaoRepository.deleteById(id);
    }

    public InscricaoDTO findById(Long id) {
        Inscricao inscricao = inscricaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inscrição não encontrada com id " + id));
        return new InscricaoDTO(inscricao);
    }

    public List<InscricaoDTO> findAll() {
        return inscricaoRepository.findAll()
                .stream()
                .map(InscricaoDTO::new)
                .collect(Collectors.toList());
    }
}

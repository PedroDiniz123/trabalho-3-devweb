package com.jpbarreiro.trabalho2devweb.service;

import com.jpbarreiro.trabalho2devweb.dto.AlunoDTO;
import com.jpbarreiro.trabalho2devweb.exception.ResourceNotFoundException;
import com.jpbarreiro.trabalho2devweb.model.Aluno;
import com.jpbarreiro.trabalho2devweb.repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    private final AlunoRepository repository;

    public AlunoService(AlunoRepository repository) {
        this.repository = repository;
    }

    public AlunoDTO create(AlunoDTO dto) {
        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email é obrigatório");
        }

        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome());
        aluno.setEmail(dto.getEmail());

        Aluno saved = repository.save(aluno);

        return new AlunoDTO(saved);
    }

    public AlunoDTO update(Long id, AlunoDTO dto) {
        Aluno aluno = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com id " + id));

        if (dto.getNome() != null && !dto.getNome().isBlank()) {
            aluno.setNome(dto.getNome());
        }
        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            aluno.setEmail(dto.getEmail());
        }

        Aluno updated = repository.save(aluno);
        return new AlunoDTO(updated);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Aluno não encontrado com id " + id);
        }
        repository.deleteById(id);
    }

    public AlunoDTO findById(Long id) {
        Aluno aluno = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com id " + id));
        return new AlunoDTO(aluno);
    }

    public List<AlunoDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(AlunoDTO::new)
                .collect(Collectors.toList());
    }
}

package com.jpbarreiro.trabalho2devweb.service;

import com.jpbarreiro.trabalho2devweb.dto.ProfessorDTO;
import com.jpbarreiro.trabalho2devweb.exception.ResourceNotFoundException;
import com.jpbarreiro.trabalho2devweb.model.Professor;
import com.jpbarreiro.trabalho2devweb.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorService {

    private final ProfessorRepository repository;

    public ProfessorService(ProfessorRepository repository) {
        this.repository = repository;
    }

    public ProfessorDTO create(ProfessorDTO dto) {
        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email é obrigatório");
        }

        Professor professor = new Professor();
        professor.setNome(dto.getNome());
        professor.setEmail(dto.getEmail());

        Professor saved = repository.save(professor);

        return new ProfessorDTO(saved);
    }

    public ProfessorDTO update(Long id, ProfessorDTO dto) {
        Professor professor = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado com id " + id));

        if (dto.getNome() != null && !dto.getNome().isBlank()) {
            professor.setNome(dto.getNome());
        }
        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            professor.setEmail(dto.getEmail());
        }

        Professor updated = repository.save(professor);
        return new ProfessorDTO(updated);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Professor não encontrado com id " + id);
        }
        repository.deleteById(id);
    }

    public ProfessorDTO findById(Long id) {
        Professor professor =  repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado com id " + id));
        return new ProfessorDTO(professor);
    }

    public List<ProfessorDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(ProfessorDTO::new)
                .collect(Collectors.toList());
    }
}

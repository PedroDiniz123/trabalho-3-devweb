package com.jpbarreiro.trabalho2devweb.service;

import com.jpbarreiro.trabalho2devweb.dto.DisciplinaDTO;
import com.jpbarreiro.trabalho2devweb.exception.ResourceNotFoundException;
import com.jpbarreiro.trabalho2devweb.model.Disciplina;
import com.jpbarreiro.trabalho2devweb.repository.DisciplinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DisciplinaService {

    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public DisciplinaDTO create(DisciplinaDTO dto) {
        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (dto.getCodigo() == null || dto.getCodigo().isBlank()) {
            throw new IllegalArgumentException("Código é obrigatório");
        }

        Disciplina disciplina = new Disciplina();
        disciplina.setNome(dto.getNome());
        disciplina.setCodigo(dto.getCodigo());
        disciplina.setCargaHoraria(dto.getCargaHoraria());

        Disciplina saved = disciplinaRepository.save(disciplina);

        return new DisciplinaDTO(saved);
    }

    public DisciplinaDTO update(Long id, DisciplinaDTO dto) {
        Disciplina disciplina = disciplinaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disciplina não encontrada com id " + id));

        if (dto.getNome() != null && !dto.getNome().isBlank()) {
            disciplina.setNome(dto.getNome());
        }
        if (dto.getCodigo() != null && !dto.getCodigo().isBlank()) {
            disciplina.setCodigo(dto.getCodigo());
        }
        if (dto.getCargaHoraria() != null) {
            disciplina.setCargaHoraria(dto.getCargaHoraria());
        }

        Disciplina updated = disciplinaRepository.save(disciplina);

        return new DisciplinaDTO(updated);
    }

    public void delete(Long id) {
        if (!disciplinaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Disciplina não encontrada com id " + id);
        }
        disciplinaRepository.deleteById(id);
    }

    public DisciplinaDTO findById(Long id) {
        Disciplina disciplina = disciplinaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disciplina não encontrada com id " + id));
        return new DisciplinaDTO(disciplina);
    }

    public List<DisciplinaDTO> findAll() {
        return disciplinaRepository.findAll()
                .stream()
                .map(DisciplinaDTO::new)
                .collect(Collectors.toList());
    }
}

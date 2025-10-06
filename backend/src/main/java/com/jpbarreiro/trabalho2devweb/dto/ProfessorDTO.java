package com.jpbarreiro.trabalho2devweb.dto;

import com.jpbarreiro.trabalho2devweb.model.Professor;
import com.jpbarreiro.trabalho2devweb.model.Turma;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProfessorDTO {
    private Long id;
    private String nome;
    private String email;
    private List<TurmaDTO> turmas;

    public ProfessorDTO() {
    }

    public ProfessorDTO(Long id, String nome, String email, List<TurmaDTO> turmas) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.turmas = turmas;
    }

    public ProfessorDTO(Professor professor) {
        this.id = professor.getId();
        this.nome = professor.getNome();
        this.email = professor.getEmail();
        if (professor.getTurmas() != null) {
            this.turmas = professor.getTurmas()
                    .stream()
                    .map(t -> new TurmaDTO(t.getId(), t.getNome(), t.getProfessor().getId(), t.getAno(), t.getPeriodo()))
                    .toList();
        }
    }
}

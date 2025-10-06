package com.jpbarreiro.trabalho2devweb.dto;

import com.jpbarreiro.trabalho2devweb.model.Turma;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TurmaDTO {
    private Long id;
    private String nome;
    private Long professorId;
    private Integer ano;
    private Integer periodo;

    public TurmaDTO() {
    }

    public TurmaDTO(Long id, String nome, Long professorId, Integer ano, Integer periodo) {
        this.id = id;
        this.nome = nome;
        this.professorId = professorId;
        this.ano = ano;
        this.periodo = periodo;
    }

    public TurmaDTO(Turma turma) {
        this.id = turma.getId();
        this.nome = turma.getNome();
        this.professorId = turma.getProfessor() != null ? turma.getProfessor().getId() : null;
        this.ano = turma.getAno();
        this.periodo = turma.getPeriodo();
    }
}

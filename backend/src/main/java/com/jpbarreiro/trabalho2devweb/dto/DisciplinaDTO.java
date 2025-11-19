package com.jpbarreiro.trabalho2devweb.dto;

import com.jpbarreiro.trabalho2devweb.model.Disciplina;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DisciplinaDTO {
    private Long id;
    private String nome;
    private String codigo;
    private Integer cargaHoraria;

    public DisciplinaDTO() {
    }

    public DisciplinaDTO(Long id, String nome, String codigo, Integer cargaHoraria) {
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.cargaHoraria = cargaHoraria;
    }

    public DisciplinaDTO(Disciplina disciplina) {
        this.id = disciplina.getId();
        this.nome = disciplina.getNome();
        this.codigo = disciplina.getCodigo();
        this.cargaHoraria = disciplina.getCargaHoraria();
    }
}

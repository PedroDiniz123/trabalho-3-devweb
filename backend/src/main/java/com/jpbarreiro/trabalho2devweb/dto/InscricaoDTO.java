package com.jpbarreiro.trabalho2devweb.dto;

import com.jpbarreiro.trabalho2devweb.model.Inscricao;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class InscricaoDTO {
    private Long id;
    private Long alunoId;
    private Long turmaId;
    private LocalDateTime dataHora;

    public InscricaoDTO() {
    }

    public InscricaoDTO(Long id, Long alunoId, Long turmaId, LocalDateTime dataHora) {
        this.id = id;
        this.alunoId = alunoId;
        this.turmaId = turmaId;
        this.dataHora = dataHora;
    }

    public InscricaoDTO(Inscricao inscricao) {
        this.id = inscricao.getId();
        this.alunoId = inscricao.getAluno().getId();
        this.turmaId = inscricao.getTurma().getId();
        this.dataHora = inscricao.getDataHora();
    }
}

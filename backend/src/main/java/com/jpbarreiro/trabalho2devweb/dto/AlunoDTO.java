package com.jpbarreiro.trabalho2devweb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jpbarreiro.trabalho2devweb.model.Aluno;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class AlunoDTO {
    private Long id;
    private String nome;
    private String email;
    
    @JsonProperty("CPF")
    private String cpf;
    
    private List<InscricaoDTO> inscricoes;

    public AlunoDTO() {
    }

    public AlunoDTO(Long id, String nome, String email, String cpf, List<InscricaoDTO> inscricoes) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.inscricoes = inscricoes;
        this.cpf = cpf;
    }

    public AlunoDTO(Aluno aluno) {
        this.id = aluno.getId();
        this.nome = aluno.getNome();
        this.email = aluno.getEmail();
        this.cpf = aluno.getCpf();
        if (aluno.getInscricoes() != null) {
            this.inscricoes = aluno.getInscricoes()
                    .stream()
                    .map(i -> new InscricaoDTO(i.getId(), i.getAluno().getId(), i.getTurma().getId(), i.getDataHora()))
                    .collect(Collectors.toList());
        }
    }
}
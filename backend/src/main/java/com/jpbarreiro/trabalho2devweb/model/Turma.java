package com.jpbarreiro.trabalho2devweb.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer ano;

    @Column(nullable = false)
    private Integer periodo;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor;
}


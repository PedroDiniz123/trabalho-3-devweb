package com.jpbarreiro.trabalho2devweb.repository;

import com.jpbarreiro.trabalho2devweb.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    List<Turma> findByDisciplinaId(Long disciplinaId);
}

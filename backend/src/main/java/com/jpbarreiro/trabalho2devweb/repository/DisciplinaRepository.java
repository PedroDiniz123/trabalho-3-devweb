package com.jpbarreiro.trabalho2devweb.repository;

import com.jpbarreiro.trabalho2devweb.model.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
}

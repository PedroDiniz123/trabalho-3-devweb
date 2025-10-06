package com.jpbarreiro.trabalho2devweb.repository;

import com.jpbarreiro.trabalho2devweb.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}

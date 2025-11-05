package com.jpbarreiro.trabalho2devweb.repository;

import com.jpbarreiro.trabalho2devweb.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findByTurmaId(Long turmaId);
}

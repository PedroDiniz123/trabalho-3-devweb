package com.jpbarreiro.trabalho2devweb;

import com.jpbarreiro.trabalho2devweb.model.Aluno;
import com.jpbarreiro.trabalho2devweb.model.Professor;
import com.jpbarreiro.trabalho2devweb.model.Turma;
import com.jpbarreiro.trabalho2devweb.model.Inscricao;
import com.jpbarreiro.trabalho2devweb.repository.AlunoRepository;
import com.jpbarreiro.trabalho2devweb.repository.ProfessorRepository;
import com.jpbarreiro.trabalho2devweb.repository.TurmaRepository;
import com.jpbarreiro.trabalho2devweb.repository.InscricaoRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.time.LocalDateTime;

@SpringBootApplication
public class MainSeeder {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(MainSeeder.class, args);

        AlunoRepository alunoRepo = context.getBean(AlunoRepository.class);
        ProfessorRepository professorRepo = context.getBean(ProfessorRepository.class);
        TurmaRepository turmaRepo = context.getBean(TurmaRepository.class);
        InscricaoRepository inscricaoRepo = context.getBean(InscricaoRepository.class);

        // Professores
        Professor prof1 = new Professor();
        prof1.setNome("Prof. Ana");
        prof1.setEmail("ana@escola.com");
        professorRepo.save(prof1);

        Professor prof2 = new Professor();
        prof2.setNome("Prof. Bruno");
        prof2.setEmail("bruno@escola.com");
        professorRepo.save(prof2);

        // Turmas
        Turma turma1 = new Turma();
        turma1.setNome("Matemática");
        turma1.setProfessor(prof1);
        turma1.setAno(2025);
        turma1.setPeriodo(1);
        turmaRepo.save(turma1);

        Turma turma2 = new Turma();
        turma2.setNome("História");
        turma2.setProfessor(prof2);
        turma2.setAno(2025);
        turma2.setPeriodo(2);
        turmaRepo.save(turma2);

        // Alunos
        Aluno aluno1 = new Aluno();
        aluno1.setNome("Carlos Silva");
        aluno1.setEmail("carlos@aluno.com");
        alunoRepo.save(aluno1);

        Aluno aluno2 = new Aluno();
        aluno2.setNome("Maria Souza");
        aluno2.setEmail("maria@aluno.com");
        alunoRepo.save(aluno2);

        // Inscrições
        Inscricao insc1 = new Inscricao();
        insc1.setAluno(aluno1);
        insc1.setTurma(turma1);
        insc1.setDataHora(LocalDateTime.now());
        inscricaoRepo.save(insc1);

        Inscricao insc2 = new Inscricao();
        insc2.setAluno(aluno2);
        insc2.setTurma(turma2);
        insc2.setDataHora(LocalDateTime.now());
        inscricaoRepo.save(insc2);
    }
}


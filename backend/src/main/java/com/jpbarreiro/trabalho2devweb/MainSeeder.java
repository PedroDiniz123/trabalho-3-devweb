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
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class MainSeeder {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(MainSeeder.class, args);

        AlunoRepository alunoRepo = context.getBean(AlunoRepository.class);
        ProfessorRepository professorRepo = context.getBean(ProfessorRepository.class);
        TurmaRepository turmaRepo = context.getBean(TurmaRepository.class);
        InscricaoRepository inscricaoRepo = context.getBean(InscricaoRepository.class);

        // Limpar dados anteriores (opcional)
        inscricaoRepo.deleteAll();
        turmaRepo.deleteAll();
        alunoRepo.deleteAll();
        professorRepo.deleteAll();

        // Professores
        Professor prof1 = new Professor();
        prof1.setNome("Carlos Ribeiro");
        prof1.setEmail("carlos@escola.com");
        professorRepo.save(prof1);

        Professor prof2 = new Professor();
        prof2.setNome("Bruno");
        prof2.setEmail("bruno@escola.com");
        professorRepo.save(prof2);

        Professor prof3 = new Professor();
        prof3.setNome("João Pedro");
        prof3.setEmail("joão@escola.com");
        professorRepo.save(prof3);

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

        Turma turma3 = new Turma();
        turma3.setNome("Física");
        turma3.setProfessor(prof3);
        turma3.setAno(2025);
        turma3.setPeriodo(1);
        turmaRepo.save(turma3);

        // Criar vários alunos
        List<Aluno> alunos = new ArrayList<>();

        String[] nomesBase = {
                "Carlos Silva", "Maria Souza", "João Pereira", "Fernanda Lima", "Pedro Oliveira",
                "Juliana Costa", "Rafael Gomes", "Patrícia Santos", "Lucas Almeida", "Beatriz Rocha",
                "André Mendes", "Larissa Castro", "Ricardo Nunes", "Camila Ribeiro", "Marcos Lima",
                "Isabela Fernandes", "Gustavo Cardoso", "Ana Paula", "Vinícius Freitas", "Clara Melo",
                "Thiago Carvalho", "Laura Pires", "Fábio Duarte", "Natália Azevedo", "Henrique Barbosa",
                "Sabrina Moreira", "Eduardo Ramos", "Bianca Teixeira", "Felipe Souza", "Aline Matos"
        };

        for (String nome : nomesBase) {
            Aluno aluno = new Aluno();
            aluno.setNome(nome);
            aluno.setEmail(nome.toLowerCase()
                    .replace(" ", ".")
                    .replace("ã", "a")
                    .replace("á", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ú", "u")
                    + "@aluno.com");

            aluno.setCPF(gerarCpf()); // gera CPF válido e aleatório

            alunos.add(alunoRepo.save(aluno));
        }

        // Inscrever os alunos nas turmas (20 por turma)
        for (int i = 0; i < 20 && i < alunos.size(); i++) {
            Inscricao insc = new Inscricao();
            insc.setAluno(alunos.get(i));
            insc.setTurma(turma1);
            insc.setDataHora(LocalDateTime.now());
            inscricaoRepo.save(insc);
        }

        for (int i = 10; i < 30 && i < alunos.size(); i++) {
            Inscricao insc = new Inscricao();
            insc.setAluno(alunos.get(i));
            insc.setTurma(turma2);
            insc.setDataHora(LocalDateTime.now());
            inscricaoRepo.save(insc);
        }

        for (int i = 5; i < 25 && i < alunos.size(); i++) {
            Inscricao insc = new Inscricao();
            insc.setAluno(alunos.get(i));
            insc.setTurma(turma3);
            insc.setDataHora(LocalDateTime.now());
            inscricaoRepo.save(insc);
        }

        System.out.println("✅ Banco populado com sucesso!");
        System.out.println("Turmas criadas: " + turmaRepo.count());
        System.out.println("Alunos criados: " + alunoRepo.count());
        System.out.println("Inscrições criadas: " + inscricaoRepo.count());
    }

    /**
     * Gera um CPF válido e aleatório no formato XXX.XXX.XXX-YY.
     */
    private static String gerarCpf() {
        Random random = new Random();
        int[] numeros = new int[9];

        for (int i = 0; i < 9; i++) {
            numeros[i] = random.nextInt(10);
        }

        // Calcula o primeiro dígito verificador
        int soma1 = 0;
        for (int i = 0; i < 9; i++) {
            soma1 += numeros[i] * (10 - i);
        }
        int digito1 = 11 - (soma1 % 11);
        if (digito1 >= 10) digito1 = 0;

        // Calcula o segundo dígito verificador
        int soma2 = 0;
        for (int i = 0; i < 9; i++) {
            soma2 += numeros[i] * (11 - i);
        }
        soma2 += digito1 * 2;
        int digito2 = 11 - (soma2 % 11);
        if (digito2 >= 10) digito2 = 0;

        return String.format("%d%d%d.%d%d%d.%d%d%d-%d%d",
                numeros[0], numeros[1], numeros[2],
                numeros[3], numeros[4], numeros[5],
                numeros[6], numeros[7], numeros[8],
                digito1, digito2);
    }
}

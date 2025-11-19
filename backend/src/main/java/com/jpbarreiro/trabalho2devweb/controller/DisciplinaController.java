package com.jpbarreiro.trabalho2devweb.controller;

import com.jpbarreiro.trabalho2devweb.dto.DisciplinaDTO;
import com.jpbarreiro.trabalho2devweb.dto.TurmaDTO;
import com.jpbarreiro.trabalho2devweb.service.DisciplinaService;
import com.jpbarreiro.trabalho2devweb.service.TurmaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disciplinas")
@CrossOrigin(origins = "http://localhost:3000")
public class DisciplinaController {

    private final DisciplinaService disciplinaService;
    private final TurmaService turmaService;

    public DisciplinaController(DisciplinaService disciplinaService, TurmaService turmaService) {
        this.disciplinaService = disciplinaService;
        this.turmaService = turmaService;
    }

    @PostMapping
    public ResponseEntity<DisciplinaDTO> create(@RequestBody DisciplinaDTO dto) {
        return ResponseEntity.ok(disciplinaService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DisciplinaDTO> update(@PathVariable Long id, @RequestBody DisciplinaDTO dto) {
        return ResponseEntity.ok(disciplinaService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        disciplinaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisciplinaDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(disciplinaService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<DisciplinaDTO>> findAll() {
        return ResponseEntity.ok(disciplinaService.findAll());
    }

    @GetMapping("/{id}/turmas")
    public ResponseEntity<List<TurmaDTO>> getTurmasByDisciplina(@PathVariable Long id) {
        return ResponseEntity.ok(turmaService.findByDisciplinaId(id));
    }
}

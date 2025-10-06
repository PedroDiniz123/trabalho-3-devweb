package com.jpbarreiro.trabalho2devweb.controller;

import com.jpbarreiro.trabalho2devweb.dto.TurmaDTO;
import com.jpbarreiro.trabalho2devweb.model.Turma;
import com.jpbarreiro.trabalho2devweb.service.TurmaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin(origins = "http://localhost:3000")
public class TurmaController {

    private final TurmaService service;

    public TurmaController(TurmaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TurmaDTO> create(@RequestBody TurmaDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurmaDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<TurmaDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}

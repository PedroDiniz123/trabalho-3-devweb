package com.jpbarreiro.trabalho2devweb.controller;

import com.jpbarreiro.trabalho2devweb.dto.AlunoDTO;
import com.jpbarreiro.trabalho2devweb.service.AlunoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "http://localhost:3000")
public class AlunoController {

    private final AlunoService service;

    public AlunoController(AlunoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AlunoDTO> create(@RequestBody AlunoDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDTO> update(@PathVariable Long id, @RequestBody AlunoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<AlunoDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}

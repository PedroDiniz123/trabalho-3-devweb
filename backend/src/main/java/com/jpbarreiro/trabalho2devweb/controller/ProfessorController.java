package com.jpbarreiro.trabalho2devweb.controller;

import com.jpbarreiro.trabalho2devweb.dto.ProfessorDTO;
import com.jpbarreiro.trabalho2devweb.model.Professor;
import com.jpbarreiro.trabalho2devweb.service.ProfessorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfessorController {

    private final ProfessorService service;

    public ProfessorController(ProfessorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProfessorDTO> create(@RequestBody ProfessorDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> update(@PathVariable Long id, @RequestBody ProfessorDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProfessorDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}

package com.jpbarreiro.trabalho2devweb.controller;

import com.jpbarreiro.trabalho2devweb.dto.InscricaoDTO;
import com.jpbarreiro.trabalho2devweb.service.InscricaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscricoes")
@CrossOrigin(origins = "http://localhost:3000")
public class InscricaoController {

    private final InscricaoService service;

    public InscricaoController(InscricaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<InscricaoDTO> create(@RequestBody InscricaoDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscricaoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<InscricaoDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}

package com.innovatech.proyectos.controller;

import com.innovatech.proyectos.dto.ProjectDtos.*;
import com.innovatech.proyectos.model.Project;
import com.innovatech.proyectos.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST del microservicio ms-proyectos.
 * Expone endpoints CRUD de proyectos con soporte de filtros por status y tipo.
 *
 * @author Benjamin Valdes, Ignacio Munoz
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;

    /**
     * POST /api/projects
     * Crea un nuevo proyecto usando el Factory Method correspondiente.
     */
    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody CreateProjectRequest request) {
        ProjectResponse response = projectService.createProject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/projects
     * Retorna todos los proyectos. Soporta filtros por status y tipo.
     */
    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type) {

        if (status != null) {
            return ResponseEntity.ok(projectService.getProjectsByStatus(
                    Project.ProjectStatus.valueOf(status.toUpperCase())));
        }
        if (type != null) {
            return ResponseEntity.ok(projectService.getProjectsByType(
                    Project.ProjectType.valueOf(type.toUpperCase())));
        }
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    /**
     * GET /api/projects/{id}
     * Retorna un proyecto por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    /**
     * GET /api/projects/manager/{managerId}
     * Retorna proyectos asignados a un manager.
     */
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<ProjectResponse>> getByManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(projectService.getProjectsByManager(managerId));
    }

    /**
     * PATCH /api/projects/{id}/status
     * Actualiza el estado de un proyecto.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ProjectResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(projectService.updateStatus(id, request));
    }

    /**
     * DELETE /api/projects/{id}
     * Elimina un proyecto por ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/projects/health
     * Endpoint de salud del microservicio.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "ms-proyectos",
                "version", "1.0.0",
                "totalProjects", projectService.getTotalCount()
        ));
    }
}

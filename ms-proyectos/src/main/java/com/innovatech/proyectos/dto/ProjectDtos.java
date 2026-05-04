package com.innovatech.proyectos.dto;

import com.innovatech.proyectos.model.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTOs del microservicio ms-proyectos.
 */
public class ProjectDtos {

    // ── Request: Creación de proyecto ────────────────────────────────────────
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
public static class CreateProjectRequest {
    @NotBlank(message = "El nombre del proyecto es obligatorio")
    private String name;
    
    private String description;

    @NotNull(message = "El tipo de proyecto es obligatorio")
    private Project.ProjectType type;

    // --- AGREGA ESTA LÍNEA ---
    private Project.ProjectStatus status; 
    
    private Long managerId;
        private LocalDate startDate;
        private LocalDate endDate;

        // SOFTWARE
        private String techStack;
        private String repositoryUrl;

        // CONSULTING
        private String clientName;
        private Integer slaDays;

        // INFRASTRUCTURE
        private String cloudProvider;
        private Double budgetUsd;
    }

    // ── Request: Actualización de estado ─────────────────────────────────────
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateStatusRequest {
        @NotNull(message = "El nuevo estado es obligatorio")
        private Project.ProjectStatus status;
    }

    // ── Response: Proyecto ────────────────────────────────────────────────────
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectResponse {
        private Long id;
        private String name;
        private String description;
        private String type;
        private String status;
        private Long managerId;
        private LocalDate startDate;
        private LocalDate endDate;
        private String techStack;
        private String repositoryUrl;
        private String clientName;
        private Integer slaDays;
        private String cloudProvider;
        private Double budgetUsd;
        private LocalDateTime createdAt;
    }

    // ── Response: Resumen ────────────────────────────────────────────────────
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectSummary {
        private Long id;
        private String name;
        private String type;
        private String status;
        private Long managerId;
    }
}

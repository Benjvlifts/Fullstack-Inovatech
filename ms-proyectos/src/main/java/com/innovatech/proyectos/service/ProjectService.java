package com.innovatech.proyectos.service;

import com.innovatech.proyectos.dto.ProjectDtos.*;
import com.innovatech.proyectos.model.Project;
import com.innovatech.proyectos.patterns.factory.ProjectFactory;
import com.innovatech.proyectos.patterns.factory.ProjectFactoryProvider;
import com.innovatech.proyectos.repository.IProjectRepository; 
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    // La variable debe ser de tipo Interfaz
    private final IProjectRepository projectRepository;
    
    private final ProjectFactoryProvider factoryProvider;
    
    // ... el resto del código


    // ── Creación (Factory Method) ─────────────────────────────────────────────

    @Transactional
    public ProjectResponse createProject(CreateProjectRequest request) {
        // Factory Method: obtiene la fábrica adecuada según el tipo
        ProjectFactory factory = factoryProvider.getFactory(request.getType());
        Project project = factory.createProject(request);
        Project saved = projectRepository.save(project);
        return toResponse(saved);
    }

    // ── Consultas (Repository Pattern) ───────────────────────────────────────

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado con id: " + id));
        return toResponse(project);
    }

    public List<ProjectResponse> getProjectsByStatus(Project.ProjectStatus status) {
        return projectRepository.findByStatus(status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProjectResponse> getProjectsByType(Project.ProjectType type) {
        return projectRepository.findByType(type).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProjectResponse> getProjectsByManager(Long managerId) {
        return projectRepository.findByManagerId(managerId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── Actualización ─────────────────────────────────────────────────────────

    @Transactional
    public ProjectResponse updateStatus(Long id, UpdateStatusRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado con id: " + id));
        project.setStatus(request.getStatus());
        return toResponse(projectRepository.save(project));
    }

    // ── Eliminación ───────────────────────────────────────────────────────────

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Proyecto no encontrado con id: " + id);
        }
        projectRepository.deleteById(id);
    }

    // ── Stats ─────────────────────────────────────────────────────────────────

    public long getTotalCount() {
        return projectRepository.count();
    }

    // ── Mapper ────────────────────────────────────────────────────────────────

    private ProjectResponse toResponse(Project p) {
        return ProjectResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .type(p.getType().name())
                .status(p.getStatus().name())
                .managerId(p.getManagerId())
                .startDate(p.getStartDate())
                .endDate(p.getEndDate())
                .techStack(p.getTechStack())
                .repositoryUrl(p.getRepositoryUrl())
                .clientName(p.getClientName())
                .slaDays(p.getSlaDays())
                .cloudProvider(p.getCloudProvider())
                .budgetUsd(p.getBudgetUsd())
                .createdAt(p.getCreatedAt())
                .build();
    }
}

package com.innovatech.proyectos.patterns.factory;

import com.innovatech.proyectos.dto.ProjectDtos.CreateProjectRequest;
import com.innovatech.proyectos.model.Project;

/**
 * Fábrica abstracta de proyectos.
 *
 * PATRÓN FACTORY METHOD: Define el contrato para la creación de proyectos,
 * delegando en las subclases la lógica de inicialización específica de cada tipo.
 *
 * Beneficios aplicados:
 *  - Extensibilidad: añadir un nuevo tipo de proyecto solo requiere una nueva fábrica.
 *  - Principio Open/Closed: el código existente no se modifica al agregar tipos.
 *  - Encapsulación: la lógica de construcción está oculta para el cliente.
 *  - Consistencia: todos los proyectos de un tipo se crean con los mismos atributos base.
 *
 * @author Benjamin Valdes, Ignacio Munoz
 */
public abstract class ProjectFactory {

    /**
     * Factory Method: crea un proyecto del tipo correspondiente.
     * Cada subclase concreta implementa la lógica de construcción específica.
     *
     * @param request datos de creación del proyecto
     * @return instancia de Project lista para persistir
     */
    public abstract Project createProject(CreateProjectRequest request);

    /**
     * Template Method: construye los atributos comunes a todos los proyectos.
     * Las fábricas concretas llaman a este método y complementan con atributos propios.
     */
    protected Project buildBaseProject(CreateProjectRequest request) {
        return Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .type(request.getType())
                .status(Project.ProjectStatus.PLANNING)
                .managerId(request.getManagerId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();
    }
}

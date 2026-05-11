readme_master = """# 🚀 Innovatech Solutions — Repositorio Principal

> **Plataforma Integral de Gestión de Proyectos** — Evaluación Parcial 2  
> Asignatura: DSY1106 – Desarrollo Fullstack III | Instituto IACC | 2025  
> Estudiantes: **Benjamín Valdés** · **Ignacio Muñoz**

---

## 📑 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Globales](#tecnologías-globales)
4. [Requisitos Previos](#requisitos-previos)
5. [Guía de Instalación y Ejecución Paso a Paso](#guía-de-instalación-y-ejecución-paso-a-paso)
6. [Mapa de Puertos y Servicios](#mapa-de-puertos-y-servicios)
7. [Patrones de Diseño Implementados](#patrones-de-diseño-implementados)
8. [Estrategia de Branching](#estrategia-de-branching)
9. [Resolución de Problemas Comunes](#resolución-de-problemas-comunes)

---

## 📌 Descripción del Proyecto

Innovatech Solutions es una solución empresarial diseñada para centralizar la gestión de proyectos tecnológicos. La plataforma permite el seguimiento de estados, la gestión de notas de avance, la asignación de recursos humanos y la visualización de indicadores clave, todo bajo una arquitectura robusta de microservicios.

---

## 🏗️ Arquitectura del Sistema

La solución se divide en tres capas principales que interactúan de forma desacoplada:

1.  **Capa de Presentación (Frontend)**: SPA desarrollada en React que consume exclusivamente el BFF.
2.  **Capa de Orquestación (BFF)**: Nodo intermedio en Node.js que maneja la agregación de datos y la resiliencia.
3.  **Capa de Servicios (Backend)**: Microservicios en Java/Spring Boot (Auth, Proyectos, Recursos) con persistencia independiente y comunicación asíncrona mediante Kafka.

---

## 🛠️ Tecnologías Globales

| Capa | Tecnologías |
|------------|-----------|
| **Frontend** | React, Vite, Framer Motion, Axios |
| **BFF** | Node.js, Express, Circuit Breaker (Opossum) |
| **Backend** | Java 21, Spring Boot 3, Spring Security, Hibernate |
| **Mensajería** | Apache Kafka, Zookeeper |
| **Base de Datos** | PostgreSQL 15 |
| **Infraestructura** | Docker, Docker Compose |

---

## 📥 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:
* [Java 21 JDK](https://www.oracle.com/java/technologies/downloads/)
* [Node.js 20+](https://nodejs.org/)
* [Maven 3.9+](https://maven.apache.org/download.cgi)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## 🚀 Guía de Instalación y Ejecución Paso a Paso

Para que el sistema funcione correctamente, se debe seguir el siguiente orden de encendido:

### 1. Infraestructura (Bases de Datos y Mensajería)
Inicia los servicios base usando Docker Compose desde la raíz del proyecto:
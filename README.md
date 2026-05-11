readme_content = """# 🚀 Innovatech Solutions — Repositorio Principal

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

Innovatech Solutions es una solución empresarial de vanguardia diseñada para centralizar la gestión de proyectos tecnológicos. La plataforma permite el seguimiento de estados en tiempo real, la gestión de notas de avance, la administración de capital humano y la visualización de indicadores clave, todo bajo una arquitectura robusta y escalable de microservicios.

---

## 🏗️ Arquitectura del Sistema

La solución implementa una arquitectura desacoplada en tres capas críticas:

1.  **Capa de Presentación (Frontend)**: SPA reactiva desarrollada en React + Vite que consume servicios de forma centralizada a través del BFF.
2.  **Capa de Orquestación (BFF)**: Nodo intermedio desarrollado en Node.js que actúa como Gateway, manejando la agregación de datos y la resiliencia del sistema.
3.  **Capa de Servicios (Backend)**: Microservicios en Java/Spring Boot con persistencia independiente (Database per Service) y comunicación asíncrona mediante Apache Kafka.

---

## 🛠️ Tecnologías Globales

| Capa | Tecnologías |
|------------|-----------|
| **Frontend** | React, Vite, Framer Motion, Axios, CSS Modules |
| **BFF** | Node.js, Express, Circuit Breaker (Opossum), Morgan |
| **Backend** | Java 21, Spring Boot 3.4, Spring Security, JPA/Hibernate |
| **Mensajería** | Apache Kafka, Zookeeper |
| **Base de Datos** | PostgreSQL 15 |
| **Infraestructura** | Docker, Docker Compose |

---

## 📥 Requisitos Previos

Asegúrate de contar con el siguiente stack instalado en tu entorno local:
* **Java 21 JDK** (Indispensable para los microservicios)
* **Node.js 20+** y npm
* **Maven 3.9+**
* **Docker Desktop** (para contenedores de DB y Kafka)

---

## 🚀 Guía Rápida
1. Carpeta CMD Fullstack-Inovatech `docker-compose up -d`
2. Levantar Carpeta CMD **ms-auth**, **ms-proyectos**, **ms-recursos**.  .\mvnw.cmd clean spring-boot:run 
3. Levantar Carpeta CMD**BFF**. node src/index.js
4. Levantar Carpeta CMD **Frontend**. npm install & npm run dev

---
*DuocUC — 2026*
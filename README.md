# Plantilla Angular con DevContainers

Esta plantilla transforma el proyecto original de Spring Boot en un frontal Angular que mantiene la misma experiencia dentro de un [Dev Container](https://containers.dev/). Proporciona una base moderna para crear interfaces que consuman APIs, utilizando mocks locales para emular los endpoints de bienvenida descritos en el proyecto inicial.

## Home

Bienvenido a la plantilla de **DevContainer para Angular**. Obtendrás un entorno reproducible con Node.js 20, Angular CLI y las dependencias necesarias para desarrollar y servir el frontal sin salir del contenedor.

## Características principales

- **Angular 17** con estilos SCSS y soporte para componentes standalone.
- Pantalla de bienvenida que replica la funcionalidad previa mediante mocks:
  - Acción para recuperar el mensaje actual (`GET /api/welcome`).
  - Acción para simular la actualización del mensaje (`POST /api/welcome`).
- Dependencias reducidas a lo imprescindible para desarrollar y servir el frontal.
- Configuración de Dev Container lista para VS Code o GitHub Codespaces.

## Requisitos previos

- [VS Code](https://code.visualstudio.com/) con la extensión **Dev Containers** o acceso a **GitHub Codespaces**.
- Docker instalado y ejecutándose si trabajas en local.

## Uso del Dev Container

1. Abre el repositorio en VS Code.
2. Elige **Reopen in Container** (o usa `Dev Containers: Reopen in Container`).
3. Tras la construcción se ejecutará `npm install` para preparar las dependencias de Angular.

### Cómo se ejecuta la aplicación

Dentro del contenedor (o en tu máquina con Node.js 20):

```bash
npm start
```

El servidor de desarrollo quedará disponible en `http://localhost:4200`.

### Ejemplo de petición simulada

La UI expone un ejemplo equivalente al antiguo backend:

```bash
curl http://localhost:4200/assets/mocks/welcome.json
```

Internamente, los botones "Consultar mensaje" y "Actualizar mensaje" usan mocks de RxJS que replican las respuestas de `GET /api/welcome` y `POST /api/welcome`.

## Personalización

- Ajusta los textos y la estructura de la pantalla editando los componentes en `src/app/`.
- Añade nuevos mocks o integra APIs reales creando servicios en `src/app/services/`.
- Modifica `.devcontainer/devcontainer.json` si necesitas herramientas adicionales o versiones distintas de Node.js.

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](LICENSE).

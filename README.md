# :rocket: Backend para prueba técnica en INLAZE

Este repositorio contiene el código backend desarrollado para la prueba técnica de Inlaze. El backend está implementado utilizando **NestJS** y sigue una **arquitectura de microservicios**, estructurado de la siguiente manera:

- **client-gateway**: Actúa como puerta de enlace para la comunicación entre los microservicios y los clientes.
- **projects-ws**: Gestiona todas las operaciones relacionadas con los proyectos.
- **users-ws**: Maneja la administración de usuarios y sus respectivas funciones.

El backend está conectado a una **base de datos PostgreSQL**, la cual se ejecuta en un contenedor de **Docker** para asegurar una fácil configuración y despliegue.

```
-> Contexto del Desarrollo

El objetivo de este proyecto es desarrollar una aplicación web para la gestión de tareas, que permita a los usuarios colaborar de manera eficiente. Esta aplicación está diseñada para mejorar la productividad y facilitar la organización de tareas entre equipos.
```

## :card_index_dividers: Tabla de Contenidos

1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Uso](#uso)

## :open_book: Descripción

El proyecto está desarrollado en **NestJS**, utilizando una **arquitectura de microservicios**. El backend está conectado a una base de datos **PostgreSQL**, la cual se ejecuta en un contenedor de **Docker** para asegurar una fácil configuración y despliegue.

El sistema implementa autenticación con **JWT (JSON Web Tokens)**, además de gestionar los permisos según el nivel de acceso de cada rol.

Para la interacción con la base de datos, se utilizó **TypeORM**.

## :hammer_and_wrench: Instalación

Para poder instalar y utilizar este proyecto, se deben seguir los siguientes pasos:

1. Clonar el proyecto.

2. Instalar los módulos de Node.

```bash
npm install
```

3. Configurar las variables de entorno.

> **_En el archivo .env.template se encontrara una plantilla para entender el contenido del archivo .env_**

- `env.ts`

4. Colocar a correr docker

5. Subir el contenedor de docker.

```bash
docker compose up -d
```

6. Ejecutar el proyecto.

```bash
npm run start:dev
```

> **_Por defecto corre el gateway, para colocar a correr los microservicios utilizar el siguiente comando_**

```bash
npm run start:dev {{nombre del microservicio a correr}}
```

## :computer: Uso

- Para ejecutar el gateway.

```bash
npm run start:dev client-gateway
```

- Para ejecutar cada uno de los microservicios

> Proyectos

```bash
npm run start:dev projects-ws
```

> Usuarios

```bash
npm run start:dev users-ws
```

# Moodly
## Índice

- [Anteproyecto](#anteproyecto)
  - [1. Autor](#1-autor)
  - [2. Título y temática](#2-título-y-temática)
  - [3. Objetivos / descripción](#3-objetivos--descripción)
  - [4. Funcionalidades](#4-funcionalidades)
  - [5. Arquitectura y tecnología](#5-arquitectura-y-tecnología)
  - [6. Modelo entidad-relación](#6-modelo-entidad-relación)
- [Documentación del proyecto](#documentación-del-proyecto)
  - [1. Vídeo](#1-vídeo)
  - [2. Prototipo y despliegue](#2-prototipo-y-despliegue)
  - [3. Documentación técnica](#3-documentación-técnica)
  - [4. Bitácora del proyecto](#4-bitácora-del-proyecto)
  - [5. Mejoras / propuestas futuras](#5-mejoras--propuestas-futuras)
  - [6. Bibliografía](#6-bibliografía)
- [Puesta en marcha local](#puesta-en-marcha-local)

---

# Anteproyecto

## 1. Autor

| Usuario        | Nombre                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Nombre         | **Lucía Salido López**                                                 |
| Usuario GitHub | [lsallop3012](https://github.com/lsallop3012)                          |
| Email          | lsallop3012@g.educaand.es                                              |
| Repositorio    | [Moodly-TFG](https://github.com/lsallop3012/Moodly-TFG)                |

| Usuario        | Nombre                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Nombre         | **Lucía Salido López**                                                 |
| Usuario GitHub | [luciasalidoo](https://github.com/luciasalidoo)                        |
| Repositorio    | [Moodly-TFG](https://github.com/lsallop3012/Moodly-TFG)                |

## 2. Título y temática

**Moodly — Gestor de imágenes**

Se enmarca en la temática de **gestión y descubrimiento de contenido visual**, en la línea de aplicaciones tipo Pinterest o Are.na. La plataforma permite a los usuarios descubrir contenido relacionado con emociones, intereses o estilos, guardarlo en colecciones propias (tableros) e interactuar con otros usuarios.

## 3. Objetivos / descripción

Moodly es una aplicación web orientada a la exploración, almacenamiento y compartición de imágenes inspiracionales mediante sistemas de organización visual. La plataforma permite a los usuarios descubrir contenido relacionado con emociones, intereses o estilos, guardarlo en colecciones propias e interactuar con otros usuarios.

Objetivos concretos:

- Gestión de usuarios autenticados con sistema de roles (admin / user).
- Exploración dinámica de imágenes públicas.
- Creación de colecciones temáticas (boards) propias.
- Interacción social: likes, guardado en boards.
- Administración del contenido mediante panel - solo usuarios con rol de `admin`.
- Arquitectura claramente separada en frontend (SPA) y backend (API REST).
- Despliegue reproducible mediante contenedor Docker.

## 4. Funcionalidades

### 4.1. Roles del sistema

| Rol                  | Capacidades                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Invitado**         | Navegar Home, ver páginas legales/ayuda, registrarse o iniciar sesión.                            |
| **Usuario**          | Todo lo anterior + explorar pins, crear pins/boards propios, dar like, guardar imágenes, editar su perfil. |
| **Administrador**    | Todo lo anterior + gestionar usuarios, imágenes y boards de cualquier usuario desde `admin*`.   |

El sistema de roles se basa en el enum `RoleSlug` ([`backend/app/Enums/RoleSlug.php`](backend/app/Enums/RoleSlug.php)) y se aplica en frontend con `RoleRoute` / `AdminRoute` y en backend con el middleware `admin`.

### 4.2. Vistas estáticas (públicas, sin lógica de datos dinámica)

| Vista          | Ruta             | Acceso                  |
| -------------- | ---------------- | ----------------------- |
| About Us       | `/about`         | Invitado / Usuario      |
| Terms          | `/terms`         | Invitado / Usuario      |
| Policies       | `/policies`      | Invitado / Usuario      |
| Help           | `/help`          | Invitado / Usuario      |
| Not Found      | `*`              | Cualquiera              |

### 4.3. Vistas dinámicas (consumen datos / formularios)

| Vista              | Ruta                | Acceso       | Descripción                                              |
| ------------------ | ------------------- | ------------ | -------------------------------------------------------- |
| Home               | `/`                 | Invitado     | Landing con secciones hero, explore y CTA de auth.       |
| Login              | `/login`            | Invitado     | Inicio de sesión.                                        |
| Signup             | `/signup`           | Invitado     | Registro.                                                |
| Password Reset     | `/password-reset`   | Invitado     | Solicitud de restablecimiento de contraseña.             |
| Explore            | `/explore`          | Usuario      | Galería pública con todas las imágenes.                  |
| Dashboard          | `/dashboard`        | Usuario      | Resumen de boards e imágenes propios.                    |
| Profile            | `/profile`          | Usuario      | Datos del perfil del usuario autenticado.                |
| Board Detail       | `/boards/:id`       | Usuario      | Detalle de un board con sus imágenes.                    |
| Image Detail       | `/images/:id`       | Usuario      | Detalle de una imagen, likes y opción de guardar.        |

<<<<<<< HEAD
### 4.4. Vistas CRUD de mantenimiento
=======
### 2.3. Figma
- [Enlace al figma del proyecto.](https://www.figma.com/design/G1gFaER6fheSysg1feEXvu/TFG?node-id=2002-3&t=KsD8RBHNGuXWY7K3-1)
>>>>>>> bb789a01ec2caf7ca87767715bbd01a6049af19c

| Recurso  | Vista                                | Operaciones | Acceso        |
| -------- | ------------------------------------ | ----------- | ------------- |
| Pins     | `/create`                            | C - R - U - D sobre imágenes propias. | Usuario       |
| Boards   | `/dashboard` + `/boards/:id`         | C - R - U - D sobre boards propios.   | Usuario       |
| Perfil   | `/profile`                           | R - U del usuario autenticado.        | Usuario       |
| Usuarios | `/admin/users`                       | C - R - U - D de todos los usuarios.  | Administrador |
| Imágenes | `/admin/images`                      | R - U - D de todas las imágenes.      | Administrador |
| Boards   | `/admin/boards`                      | R - U - D de todos los boards.        | Administrador |

Las rutas se agrupan en [`src/App.jsx`](frontend/frontend-moodly/src/App.jsx) bajo tres guards: `GuestRoute` (solo invitados), `ProtectedRoute` (solo autenticados) y `AdminRoute` (solo administradores).

<<<<<<< HEAD
## 5. Arquitectura y tecnología

### 5.1. Frontend

- **React 19** — librería de UI basada en componentes.
- **React Router DOM 6** — enrutado SPA con rutas anidadas y guards.
- **Vite 5** — bundler y servidor de desarrollo con HMR.
- **Axios** — cliente HTTP con interceptores para JWT y soporte `FormData`.
- **React Context API** — gestión de estado de autenticación global (`AuthContext`).
- **CSS Modules** — estilos por componente, sin frameworks pesados.
- **ESLint** — linting con plugins de React Hooks y React Refresh.

### 5.2. Backend

- **PHP 8.2+** — lenguaje base.
- **Laravel 12** — framework MVC: routing, controladores, Eloquent ORM, validación, middleware.
- **Laravel Sanctum 4** — autenticación con tokens Bearer para SPA.
- **Eloquent ORM** — capa de acceso a datos.
- **MySQL 8** (desarrollo) / **PostgreSQL** vía **Supabase** (producción).
- **Patrón Services** — lógica de negocio extraída de los controladores (`BoardService`, `ImageService`, `UserService`, `RoleService`).
- **Policies** — autorización a nivel de modelo (`BoardPolicy`, `ImagePolicy`).
- **AWS S3** vía `league/flysystem-aws-s3-v3` para almacenamiento de imágenes en producción.

### 5.3. Despliegue

- **Docker + Docker Compose** — entorno reproducible (Apache + PHP + MySQL + phpMyAdmin) definido en [`docker/`](docker/).
- **Vercel** — frontend en producción (build de Vite, output `dist/`).
- **Render** — backend Laravel en producción (build con `docker/Dockerfile`).
- **Supabase** — PostgreSQL gestionado en producción.
- **AWS S3** — bucket de imágenes en producción.

## 6. Modelo entidad-relación

```
              ┌────────┐
              │ ROLES  │
              ├────────┤
              │ id PK  │
              │ slug   │
              │ name   │
              └────┬───┘
                   │ 1
                   │
                   N
              ┌─────────────────────┐
              │       USERS         │
              ├─────────────────────┤
              │ id PK               │
              │ name                │
              │ email (unique)      │
              │ password            │
              │ bio (nullable)      │
              │ avatar (nullable)   │
              │ role_id FK          │
              └───┬───┬───┬─────┬───┘
                  │   │   │     │
            1┌────┘   │   │     └────┐ 1
             │       1│  1│          │
             N        N   N          N
       ┌────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐
       │ BOARDS │ │ IMAGES  │ │  LIKES   │ │ SAVED_IMAGES │
       ├────────┤ ├─────────┤ ├──────────┤ ├──────────────┤
       │ id PK  │ │ id PK   │ │ id PK    │ │ id PK        │
       │ name   │ │ name    │ │ user_id  │ │ user_id      │
       │ desc.  │ │ url     │ │ image_id │ │ image_id     │
       │ user_id│ │ desc.   │ └────┬─────┘ └──────┬───────┘
       └───┬────┘ │ user_id │      │              │
           │      │ uploaded│      │              │
           │      └────┬────┘      │              │
           │           │           │              │
           │  ┌────────┴─────────┐ │              │
           │  │  BOARDS_IMAGES   │ │              │
           │  │ (tabla pivote)   │ │              │
           │  ├──────────────────┤ │              │
           └──┤ board_id  FK     │ │              │
              │ image_id  FK     ├─┘              │
              │ unique(b_id,i_id)│                │
              └──────────────────┘                │
                                                  │
                                  ┌───────────────┘
                                  ↓
                          (likes y saved_images
                           apuntan a images por
                           image_id, unique por
                           pareja user+image)
```

### Entidades

- **Role** — papel del usuario en el sistema (`admin` / `user`). Slug único.
- **User** — persona registrada. Pertenece a un único Role. Posee Boards e Images.
- **Board** — colección temática que pertenece a un User y agrupa Images vía la pivote `boards_images`.
- **Image** — recurso visual subido por un User. Almacena `name`, `url`, descripción y fecha de subida.
- **BoardsImages** — pivote para la relación N–N entre Boards e Images. Tiene `unique(board_id, image_id)` para evitar duplicados.
- **Like** — registro de "me gusta" de un User a una Image. Con `unique(user_id, image_id)`.
- **SavedImage** — registro de imagen guardada por un User. Con `unique(user_id, image_id)`.

### Relaciones

- **Role 1 — N User** — un rol puede ser asignado a muchos usuarios; cada usuario tiene exactamente un rol.
- **User 1 — N Board** — un usuario crea muchos boards; cada board tiene un único propietario.
- **User 1 — N Image** — un usuario sube muchas imágenes; cada imagen tiene un único propietario.
- **Board N — N Image** — una imagen puede aparecer en varios boards y un board contiene varias imágenes (vía `boards_images`).
- **User N — N Image** (a través de **Like**) — un usuario puede dar like a muchas imágenes y una imagen recibir likes de muchos usuarios.
- **User N — N Image** (a través de **SavedImage**) — un usuario puede guardar muchas imágenes y una imagen puede ser guardada por muchos usuarios.
- Todas las FKs usan `onDelete('cascade')`: al eliminar un User se eliminan sus boards, imágenes, likes y saved_images.

---
=======
## 4. Proceso
- [Enlace al bitácora del proyecto.]()
>>>>>>> bb789a01ec2caf7ca87767715bbd01a6049af19c

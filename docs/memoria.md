# Memoria Técnica — Moodly

**Autora:** Lucía Salido López
**Curso:** 2º DAW
**Tutor:** _<nombre del tutor>_
**Fecha de entrega:** _<fecha>_

---

## Resumen ejecutivo

_Dos o tres párrafos que describan qué es Moodly, qué problema resuelve, a quién va dirigido y qué tecnologías se han usado. Pensado para que alguien que no haya visto el proyecto entienda de qué va en 30 segundos._

---

## 1. Introducción

### 1.1. Contexto y motivación
_Por qué este proyecto. Inspiración (Pinterest, mood boards). Hueco que cubre._

### 1.2. Objetivos
- **General:** desarrollar una aplicación full-stack de gestión y compartición de imágenes con sistema de boards, likes, comentarios y panel de administración.
- **Específicos:**
  - Autenticación segura con roles (invitado / usuario / admin).
  - CRUD completo de pins, boards, comentarios y usuarios.
  - Panel admin responsive.
  - Despliegue real en Vercel + AWS.

### 1.3. Alcance
_Qué entra y qué queda fuera del TFG._

### 1.4. Planificación
_Diagrama Gantt o tabla con fases del proyecto y fechas. Referenciar la bitácora._

---

## 2. Análisis

### 2.1. Estudio del mercado / referentes
_Pinterest, Are.na, We Heart It. Qué se ha tomado y qué se ha descartado._

### 2.2. Requisitos funcionales
| ID | Requisito | Rol |
|----|-----------|-----|
| RF-01 | Registro e inicio de sesión con email/password | Invitado |
| RF-02 | Inicio de sesión con Google (OAuth) | Invitado |
| RF-03 | Exploración y búsqueda de pins | Invitado |
| RF-04 | Ver detalle de pin (autor, comentarios, boards) | Invitado |
| RF-05 | Dar/quitar like a un pin | Usuario |
| RF-06 | Guardar un pin en uno o varios boards | Usuario |
| RF-07 | Crear, editar y eliminar boards propios | Usuario |
| RF-08 | Publicar, editar y eliminar pins propios | Usuario |
| RF-09 | Comentar pins y borrar comentarios propios | Usuario |
| RF-10 | Editar perfil (nombre, bio, avatar) | Usuario |
| RF-11 | Listar, crear, editar y eliminar usuarios | Admin |
| RF-12 | Moderar (editar/eliminar) cualquier pin o board | Admin |
| RF-13 | Cambiar el rol de un usuario | Admin |

### 2.3. Requisitos no funcionales
- **Seguridad:** Bearer tokens (Sanctum), passwords hasheadas con bcrypt, CORS restringido al dominio del frontend.
- **Rendimiento:** paginación en todas las listas.
- **Usabilidad:** spinners de carga, diálogos de confirmación, panel admin responsive (tabla en desktop, tarjetas en móvil).
- **Mantenibilidad:** separación clara backend/frontend, componentes reutilizables, hooks personalizados (`useFetch`, `useIsMobile`).

### 2.4. Casos de uso
_Diagrama UML de casos de uso por rol. Tabla descriptiva de los principales._

---

## 3. Diseño

### 3.1. Arquitectura general
_Diagrama: navegador → React (Vercel) → API REST → Laravel (AWS) → MySQL._

### 3.2. Modelo de datos
Ver [docs/ER.md](ER.md).

Tablas principales: `users`, `roles`, `boards`, `images`, `boards_images`, `likes`, `saved_images`, `comments`.

### 3.3. Diseño de la API
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Registro |
| POST | `/api/auth/login` | — | Login |
| POST | `/api/auth/google` | — | Login con Google |
| POST | `/api/auth/logout` | Bearer | Cerrar sesión |
| GET | `/api/auth/me` | Bearer | Perfil propio |
| GET | `/api/images` | opcional | Listar / buscar pins |
| GET | `/api/images/{id}` | opcional | Ver pin |
| POST | `/api/images` | Bearer | Crear pin |
| PUT/DELETE | `/api/images/{id}` | Bearer (owner/admin) | Editar/eliminar pin |
| POST | `/api/images/{id}/like` | Bearer | Toggle like |
| GET | `/api/boards`, `/api/boards/{id}` | opcional | Boards |
| POST/PUT/DELETE | `/api/boards/...` | Bearer (owner/admin) | CRUD boards |
| GET/POST/DELETE | `/api/comments/...` | mixto | Comentarios |
| GET/POST/PUT/DELETE | `/api/users/...` | Admin | CRUD usuarios |

_Completar con request/response de ejemplo de los endpoints principales._

### 3.4. Diseño de interfaz
- **Wireframes / Figma:** _<enlace al Figma>_
- **Paleta y tipografía:** _completar_
- **Componentes reutilizables:** `ConfirmDialog`, `Spinner`, `MasonryGrid`, `ImageCard`, `SaveToBoardModal`.

### 3.5. Control de acceso
- `ProtectedRoute`: bloquea rutas que requieren sesión.
- `RoleRoute`: bloquea por rol (`admin`).
- En backend: middleware `auth:sanctum` + middleware custom `admin` (`UserAdminMiddleware`).

---

## 4. Implementación

### 4.1. Stack tecnológico
- **Backend:** Laravel 12, PHP 8.3, MySQL 8, Sanctum.
- **Frontend:** React 19 (CRA), React Router 6, CSS Modules.
- **Infra:** Docker + Docker Compose, Apache, Vercel, AWS.

### 4.2. Estructura del repositorio
```
backend/   Laravel
frontend/  React
docker/    Dockerfile + compose + vhost
docs/      Documentación
```

### 4.3. Decisiones técnicas relevantes
- **Sanctum con Bearer tokens (no SPA stateful):** se descartó `statefulApi()` por errores de CSRF con dominios cruzados. El front guarda el token y lo manda en el header.
- **Rol como accessor:** `User->role` se sirve como string (`admin`/`user`) vía accessor que lee la relación `role` y devuelve `slug->value`.
- **Patrón `<Outlet />` en `ProtectedRoute`:** permite agrupar rutas protegidas sin envolver cada una individualmente.
- **`useIsMobile` para CRUD responsive:** se evita CSS-only para poder renderizar markup distinto (tabla vs cards) según viewport.
- **`useFetch` propio:** hook minimal que cubre `loading/error/data/refetch` sin añadir TanStack Query.

### 4.4. Problemas encontrados y solución
| Problema | Causa | Solución |
|----------|-------|----------|
| CORS bloqueado en local | Apache sin vhost apuntando a `backend/public` | Añadido `docker/vhost.conf` |
| CSRF token mismatch | `statefulApi()` activo con Bearer auth | Eliminado de `bootstrap/app.php` |
| `personal_access_tokens` no existe | Migraciones de Sanctum no publicadas | `vendor:publish` + `migrate` |
| `getRoleAttribute()` retorna enum | Cast `RoleSlug::class` en `Role` | Comprobar `instanceof` y devolver `->value` |
| Seeder no crea usuarios | `firstOrCreate` con un solo array que incluye password | Forma de dos argumentos (búsqueda + valores) |

### 4.5. Pruebas
_Listar pruebas unitarias / de integración / manuales realizadas. Capturas si procede._

---

## 5. Despliegue

### 5.1. Frontend (Vercel)
- Root: `frontend/`, build `npm run build`, output `build`.
- Env: `REACT_APP_API_URL`.
- `vercel.json` redirige todo a `index.html` (SPA fallback).

### 5.2. Backend (AWS)
- _Detallar la opción elegida (Lightsail / EC2 + RDS / ECS)._
- Variables de entorno: `APP_KEY`, `DB_*`, `FRONTEND_URL`, `SANCTUM_STATEFUL_DOMAINS`.
- Comando de despliegue: _completar_.

### 5.3. Base de datos
- MySQL 8 en _<servicio>_.
- Backups: _<política>_.

---

## 6. Conclusiones

### 6.1. Cumplimiento de objetivos
_Tabla checklist objetivo → cumplido/parcial/pendiente._

### 6.2. Líneas futuras
- Notificaciones (real-time o email).
- Etiquetas / categorías.
- Búsqueda full-text.
- App móvil (React Native).
- Migración a TanStack Query si crece la complejidad de cacheo.

### 6.3. Reflexión personal
_Qué he aprendido, qué cambiaría, qué ha sido lo más difícil._

---

## 7. Bibliografía y referencias

- [Documentación oficial de Laravel](https://laravel.com/docs/12.x)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Docker docs](https://docs.docker.com/)
- _<resto de fuentes>_

---

## Anexos

- **A1.** Repositorio: _<URL>_
- **A2.** Bitácora (wiki): _<URL>_
- **A3.** Figma: _<URL>_
- **A4.** Credenciales de prueba (en local tras seeder):
  - `admin@example.com` / `password`
  - `lucia@example.com` / `password`
- **A5.** Diagrama ER: [docs/ER.md](ER.md)

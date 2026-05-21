# Autor:
## _Lucía Salido López_
# Moodly

## 1. Temática: _Gestor de imágenes_

### 1.1. Descripción del proyecto
Moodly es una aplicación web orientada a la exploración, almacenamiento y compartición de imágenes inspiracionales mediante sistemas de organización visual. La plataforma permite a los usuarios descubrir contenido relacionado con emociones, intereses o estilos, guardarlo en colecciones propias e interactuar con otros usuarios.

### 1.2. Objetivo del proyecto
Desarrollar una aplicación web full stack que permita:
- Gestión de usuarios autenticados
- Exploración dinámica de imágenes
- Creación de colecciones (boards)
- Interacción social
- Sistema de favoritos/likes
- Comentarios
- Administración del contenido

## 2. Composición de la aplicación web

### 2.1. Roles del sistema

**Invitado (anónimo)**
- Puede: navegar el home, explorar pins, ver detalle de pins y boards, ver perfiles públicos
- No puede: guardar contenido, comentar, dar like, crear boards/pins

**Usuario autenticado**
- Publicar pins
- Guardar pins en boards propios
- Comentar y dar like
- Gestionar su perfil

**Administrador**
- Gestionar usuarios (crear, editar, asignar rol, eliminar)
- Moderar imágenes y boards de cualquier usuario
- Acceso al panel `/admin`

### 2.2. Tecnologías

**Backend:**
- Laravel 12 (PHP 8.3)
- MySQL 8
- Laravel Sanctum (autenticación con Bearer tokens)
- Eloquent ORM

**Frontend:**
- React 19 (Create React App)
- React Router v6
- CSS Modules

**Infraestructura:**
- Docker + Docker Compose (Apache + PHP + MySQL)
- Vercel (frontend en producción)
- AWS (backend en producción)

### 2.3. Figma
- [Enlace al figma del proyecto.]()

## 3. Características

- Autenticación email/password + login con Google
- Sistema de roles (admin/user) basado en `RoleSlug` enum
- CRUD completo de pins, boards, usuarios y comentarios
- Diálogos de confirmación reutilizables (`ConfirmDialog`) para acciones destructivas
- Spinners de carga (`Spinner`) en lugar de texto plano
- Panel de administración responsive: tabla en desktop, tarjetas en móvil (`useIsMobile`)
- Rutas públicas para invitados, rutas protegidas para usuarios autenticados (`ProtectedRoute`), rutas por rol (`RoleRoute`)

## 4. Proceso
- [Enlace al bitácora del proyecto.](https://github.com/lsallop3012/Vaultix-TFG/wiki/Proceso)

## 5. Cómo lanzar el proyecto

### 5.1. Requisitos
- Docker Desktop (con Docker Compose)
- Node.js 20+

### 5.2. Backend (Docker)

```bash
cd docker
docker compose up -d
```

Levanta:
- Apache + PHP en `http://localhost:8080`
- MySQL en `localhost:3307`

La primera vez, dentro del contenedor de PHP:
```bash
docker compose exec app bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

Credenciales de prueba creadas por el seeder:
- `admin@example.com` / `password` (rol admin)
- `lucia@example.com` / `password` (rol user)

### 5.3. Frontend

```bash
cd frontend
cp .env.example .env.development
npm install
npm start
```

Disponible en `http://localhost:3000`.

### 5.4. Despliegue en producción

**Frontend (Vercel):**
1. Importar el repositorio en Vercel, root directory = `frontend/`.
2. Build command: `npm run build`, output: `build`.
3. Variable de entorno: `REACT_APP_API_URL = https://api.tu-dominio.com/api`.
4. El `vercel.json` ya incluido hace el rewrite SPA a `index.html`.

**Backend (AWS):**
- Opción A: AWS Lightsail con la imagen Docker de `docker/Dockerfile`.
- Opción B: EC2 + RDS (MySQL).
- Variables de entorno mínimas: `APP_KEY`, `DB_*`, `FRONTEND_URL` (para CORS), `SANCTUM_STATEFUL_DOMAINS`.

## 6. Estructura

```
backend/    Laravel 12 (API en /api)
frontend/   React 19 (CRA)
docker/     Dockerfile + docker-compose.yml + vhost.conf
```

Documentación adicional:
- [Diagrama Entidad-Relación](docs/ER.md)

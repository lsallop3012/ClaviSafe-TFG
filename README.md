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

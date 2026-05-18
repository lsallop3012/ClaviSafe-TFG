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
- Creación de colecciones
- Interacción social
- Sistema de favoritos/likes
- Comentarios
- Administración del contenido
- Organización mediante etiquetas o categorías

## 2. Composición de la aplicación web
### Roles del sistema
Invitado
> Puede:
> - Navegar landing
> - Buscar parcialmente
> No puede:
> - Guardar contenido
> - Comentar
> - Crear colecciones

> Usuario autenticado
> Puede:
> - Publicar
> - Guardar
> - Comentar
> - Gestionar perfil

Administrador
> Puede:
> - Gestionar usuarios
> - Moderar contenido
> - Gestionar categorías
> - Eliminar publicaciones

### 2.2. Tecnologías
Para el desarrollo del backend:
- ASP.NET
- MySql
- ORM: EF Core
 
Para el desarrollo del Frontend:
- Next.js
- Tailwind css
- Zustand
- TanStack Query
- React Hook Form
- Zod
 
Para el desplegado de la aplicación:
- Docker
- Amazon Web Services (AWS)

### 2.3. Figma
- [Enlace al figma del proyecto.](https://www.figma.com/design/8GFuKDbj6VZdQVJeb1DoGL/Vaultix?node-id=0-1&t=0BuwWcZZkr1OX8LP-1)
  
## 3. Características
- Autenticación de usuarios.
- Almacenamiento seguro de credenciales.
- Validación de datos tanto en frontend como en backend.
- Interfaz sencilla e intuitiva.
- Gestión centralizada de contraseñas.
- Arquitectura desacoplada basada en DDD.

## 4. Proceso
- [Enlace al bitácora del proyecto.](https://github.com/lsallop3012/Vaultix-TFG/wiki/Proceso)

## 5. Como lanzar el proyecto

# Moodly
## Temática: _Gestor de imágenes_
## 1. Descripción del proyecto
El objetivo de Moodly es proporcionar una plataforma web de gestión y descubrimiento de imágenes basada en una experiencia similar a Pinterest, donde los usuarios puedan explorar, guardar y organizar contenido visual de forma intuitiva.
La aplicación está diseñada para facilitar la inspiración visual diaria, permitiendo a los usuarios crear colecciones personalizadas de imágenes (boards), subir contenido propio o guardar imágenes de otros usuarios dentro de su perfil.
De esta forma, el usuario puede centralizar sus intereses visuales en un único lugar, organizar ideas por temáticas y acceder a ellas de manera rápida y estructurada.

## 2. Composición de la aplicación web
### 2.1. Arquitectura 
Para el desarrollo del proyecto se ha adoptado una arquitectura basada en Domain-Driven Design (DDD) con el objetivo de separar claramente la lógica de negocio con el resto de capas de la aplicación.
 > De esta forma:
 > - Se aísla la lógica crítica del dominio, evitando dependencias innecesarias.
 > - Se mejora la mantenibilidad y la escalabilidad del sistema.
 > - Se facilita la evolución del proyecto sin comprometer la integridad de las reglas de negocio.

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

# Vaultix
## Temática: _Gestor de contraseñas_
## 1. Descripción del proyecto
El objetivo de Vaultix es proporcionar una solución segura y eficiente para la gestión de credenciales, permitiendo a los usuarios almacenar y acceder a sus contraseñas de forma centralizada.
La aplicación está pensada para facilitar el uso diario de credenciales, permitiendo organizarlas y consultarlas de manera sencilla en un único lugar. Así el usuario puede tener un mayor control sobre sus cuentas y evitar la necesidad de recordar múltiples contraseñas o gestionarlas de forma desordenada.

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

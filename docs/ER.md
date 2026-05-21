# Diagrama Entidad-Relación — Moodly

Derivado de las migraciones en `backend/database/migrations/`.

## Diagrama

```mermaid
erDiagram
    ROLES ||--o{ USERS : "asigna"
    USERS ||--o{ BOARDS : "crea"
    USERS ||--o{ IMAGES : "publica"
    USERS ||--o{ LIKES : "da"
    USERS ||--o{ SAVED_IMAGES : "guarda"
    USERS ||--o{ COMMENTS : "escribe"
    BOARDS ||--o{ BOARDS_IMAGES : "contiene"
    IMAGES ||--o{ BOARDS_IMAGES : "está en"
    IMAGES ||--o{ LIKES : "recibe"
    IMAGES ||--o{ SAVED_IMAGES : "se guarda como"
    IMAGES ||--o{ COMMENTS : "recibe"

    ROLES {
        bigint id PK
        string slug UK "admin | user"
        string name UK
        timestamps
    }

    USERS {
        bigint id PK
        string name
        string email UK
        timestamp email_verified_at
        string password
        bigint role_id FK
        text bio
        string avatar
        timestamps
    }

    BOARDS {
        bigint id PK
        string name
        text description
        bigint user_id FK
        timestamps
    }

    IMAGES {
        bigint id PK
        string name
        string url
        text description
        timestamp uploaded_at
        bigint user_id FK
        timestamps
    }

    BOARDS_IMAGES {
        bigint id PK
        bigint board_id FK
        bigint image_id FK
        timestamps
    }

    LIKES {
        bigint id PK
        bigint user_id FK
        bigint image_id FK
        timestamps
    }

    SAVED_IMAGES {
        bigint id PK
        bigint user_id FK
        bigint image_id FK
        timestamps
    }

    COMMENTS {
        bigint id PK
        bigint user_id FK
        bigint image_id FK
        text content
        timestamps
    }
```

## Restricciones

- `roles.slug`, `roles.name`, `users.email`: únicos.
- `boards_images (board_id, image_id)`: único — un pin solo aparece una vez por board.
- `likes (user_id, image_id)`: único — un usuario solo puede dar un like por pin.
- `saved_images (user_id, image_id)`: único — un pin solo se guarda una vez por usuario.
- Todas las FK borran en cascada (`ON DELETE CASCADE`). Eliminar un usuario elimina sus boards, pins, likes, guardados y comentarios.

## Notas

- El campo `role` en JSON viene de un accessor (`getRoleAttribute`) sobre la relación `users.role_id → roles.slug`.
- Los tokens de API (`personal_access_tokens`) los gestiona Laravel Sanctum; no se modela aquí porque no es lógica de dominio.

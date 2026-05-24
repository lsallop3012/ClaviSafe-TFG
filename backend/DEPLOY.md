# Deploy Moodly

## 1. Supabase (Postgres)

1. supabase.com → New Project → guarda DB password
2. Settings → Database → copia: `Host`, `User`, `Password`, `Port=5432`, `DB=postgres`
3. Pool Mode = Transaction desactivado para Laravel (usa direct port 5432)

## 2. Backend Laravel en Render

### Configuración Render
| Campo | Valor |
|-------|-------|
| Environment | Docker |
| Root Directory | *(vacío)* |
| Dockerfile Path | `docker/Dockerfile` |
| Docker Build Context | `.` (raíz monorepo) |

### Variables de entorno en Render
```
APP_NAME=Moodly
APP_ENV=production
APP_KEY=base64:<php artisan key:generate --show>
APP_DEBUG=false
APP_URL=https://<tu-app>.onrender.com
LOG_CHANNEL=stderr
DB_CONNECTION=pgsql
DB_HOST=<supabase-host>
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres.<supabase-project-ref>
DB_PASSWORD=<supabase-password>
DB_SSLMODE=require
SESSION_DRIVER=cookie
CACHE_STORE=file
QUEUE_CONNECTION=sync
FRONTEND_URL=https://<tu-app>.vercel.app
```

> Genera APP_KEY localmente: `php artisan key:generate --show`

### Migraciones
Se ejecutan automáticamente en `docker/entrypoint.sh` en cada deploy.

## 3. Frontend React en Vercel

| Campo | Valor |
|-------|-------|
| Root Directory | `frontend/frontend-moodly` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### Variable de entorno en Vercel
```
VITE_API_URL=https://<tu-app>.onrender.com/api
```

## 4. Post-deploy

1. Actualiza `FRONTEND_URL` en Render con dominio real de Vercel → Redeploy
2. Prueba: login + endpoint protegido + CORS

## Troubleshooting

| Error | Fix |
|-------|-----|
| `SQLSTATE[08006]` SSL | Añade `DB_SSLMODE=require` |
| CORS bloqueado | Revisa `FRONTEND_URL` en Render |
| 500 sin detalle | `APP_DEBUG=false` + ver logs Render |
| Migrate falla | Ver logs → posibles tipos MySQL incompatibles |
| `APP_KEY` inválido | Regenera con `php artisan key:generate --show` |

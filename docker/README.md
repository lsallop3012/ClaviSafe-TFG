#### 1.1.1.2. Eliminar todos los contenedores de la solución:
        docker compose --env-file .env.docker down -v
#### 1.1.1.3. Comprobar que no tenemos contenedores activos:
        docker compose --env-file .env.docker ps
#### 1.1.1.4. Construir el contenedor web:
        docker compose --env-file .env.docker build
#### 1.1.1.5. Levantar los contenedores
        docker compose --env-file .env.docker up -d
#### 1.1.1.6. Acceder al contenedor web:
        docker exec -it gestor-moodly-web-1 bash
#### 1.1.1.7. Comprobar que composer funciona correctamente en el contenedor web:
        composer -v
#### 1.1.1.8. Crear el proyecto/solución Laravel dentro del contenedor web:
        composer create-project laravel/laravel backend
#### 1.1.1.9. Comprobar el correcto funcionamiento del entorno:
        http://localhost:8081
        http://localhost:8080/backend/public/index.php
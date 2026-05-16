## 1. BACKEND
### 1.2. Eliminar todos los contenedores de la solución:
        docker compose --env-file .env.docker down -v
### 1.3. Comprobar que no tenemos contenedores activos:
        docker compose --env-file .env.docker ps
### 1.4. Construir el contenedor web:
        docker compose --env-file .env.docker build
### 1.5. Levantar los contenedores
        docker compose --env-file .env.docker up -d
### 1.6. Acceder al contenedor web:
        docker exec -it gestor-moodly-web-1 bash
### 1.7. Comprobar que composer funciona correctamente en el contenedor web:
        composer -v
### 1.8. Crear el proyecto/solución Laravel dentro del contenedor web:
        composer create-project laravel/laravel backend
### 1.8. Parar el contenedor web:
        docker compose down

## 2. FRONTEND
### 2.2. To Run the app in the development mode:
        npm start
### 2.3. Launches the test runner in the interactive watch mode.
        npm test
### 2.4. Builds the app for production to the `build` folder.
        npm run build
### 2.5. Ejects the aplication.
        npm run eject

## 3. DESPLIEGUE
### 3.1. Despliegue:
        - REACT-APP: http://localhost:3000
        - PHPMYADMIN: http://localhost:8081
        - LARAVEL: http://localhost:8080/backend/public/index.php
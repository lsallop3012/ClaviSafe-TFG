FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Exponer puerto de Vite
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "dev"]
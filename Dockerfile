# Usa la imagen base de Node.js versión 14
FROM node:14

# Establece el directorio de trabajo en /app dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación especificadas en package.json
RUN npm install

# Copia el código fuente completo de la aplicación al directorio de trabajo
COPY . .

# Compila el código fuente usando Babel
RUN npm run build

# Expone el puerto 3000 para acceder a la aplicación en el contenedor
EXPOSE 3000

# Ejecuta la aplicacion
CMD ["npm", "start"]

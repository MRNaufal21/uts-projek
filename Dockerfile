# Gunakan base image Node.js
FROM node:18

# Buat working directory
WORKDIR /app

# Copy file konfigurasi
COPY package*.json ./

# Install dependency
RUN npm install

# Copy semua file ke image
COPY . .

# Jalankan aplikasi
CMD ["node", "app.js"]

# Aplikasi berjalan di port 3000
EXPOSE 3000

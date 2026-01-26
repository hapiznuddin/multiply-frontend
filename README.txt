# Panduan Menjalankan Project Multiply Quiz

Project ini terdiri dari dua bagian: Backend (Laravel) dan Frontend (Next.js).

## 1. Backend (Laravel)

Backend menggunakan Docker untuk environment-nya.

Langkah-langkah:
1.  Masuk ke direktori backend:
    ```bash
    cd multiply-backend
    ```

2.  Copy file `.env.example` menjadi `.env` (jika belum ada):
    ```bash
    cp .env.example .env
    ```

3.  Jalankan Docker Compose:
    ```bash
    docker-compose up -d --build
    ```

4.  Install dpendencies (jika belum):
    ```bash
    docker exec -it multiply_laravel composer install
    ```

5.  Generate Application Key (jika belum):
    ```bash
    docker exec -it multiply_laravel php artisan key:generate
    ```

6.  Jalankan Migrasi Database:
    ```bash
    docker exec -it multiply_laravel php artisan migrate
    ```

7.  Backend akan berjalan di port yang dikonfigurasi (biasanya http://localhost:8080).

**Catatan**: Gunakan perintah `docker exec -it multiply_laravel <command>` untuk menjalankan perintah artisan atau composer lainnya di terminal container.

## 2. Frontend (Next.js)

Frontend adalah aplikasi Next.js standar.

Langkah-langkah:
1.  Masuk ke direktori frontend:
    ```bash
    cd multiply-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Jalankan development server:
    ```bash
    npm run dev
    ```

4.  Buka browser dan akses aplikasi di http://localhost:3000.

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            
            refresh: true,
        }),
        react(),
    ],
    server: {
        proxy: {
            '/api': 'http://localhost', // Sesuaikan dengan alamat backend Laravel
            '/sanctum/csrf-cookie': 'http://localhost', // Tambahkan untuk mengizinkan request CSRF
        }
    }
});

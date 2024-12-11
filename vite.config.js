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
        host: '0.0.0.0', 
        port: 5173, 
        cors: true, 
        proxy: {
            '/api': 'http://localhost', 
            '/sanctum/csrf-cookie': 'http://localhost', 
        },
        hmr: {
            host: '192.168.1.2', 
            protocol: 'ws',
            port: 5173,
        },
    }
});

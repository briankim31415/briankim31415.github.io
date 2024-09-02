import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				personal_ad: resolve(__dirname, '/src/personal_ad/index.html'),
			},
		},
	},
});

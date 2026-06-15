import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [react()],
	build: {
		target: 'esnext',
		rollupOptions: {
			input: {
				main: fileURLToPath(new URL('./index.html', import.meta.url)),
				chordNumbers: fileURLToPath(new URL('./chord-numbers/index.html', import.meta.url)),
			},
		},
	},
});

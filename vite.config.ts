import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [react(), svgr()],
	css: {
		modules: {
			generateScopedName: '[folder]__[local]-[hash:base64:5]'
		}
	}
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configurazione Vite
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    globals: true, // Abilita variabili globali per i test
    environment: 'jsdom', // Ambiente DOM virtuale
    setupFiles: './src/test/setup.js' // File di setup opzionale per i test
  },
});
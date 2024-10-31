import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@chakra-ui/react': '@chakra-ui/react/dist/chakra-ui.cjs.js'
    }
  }
});

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'; // opcjonalne
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      resolvers: [VueUseComponentsResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@scss': path.resolve(__dirname, './src/assests/scss'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        api: 'modern-compiler',
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
      },
    },
    devSourcemap: true,
  },
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': {},
  },
  worker: {
    format: 'es',
  },
});

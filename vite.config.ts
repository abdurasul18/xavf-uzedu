import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import svgLoader from 'vite-svg-loader'
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    Pages({ 
      extensions: ['vue'], // Enables auto-importing Vue files as routes
    }),
    VueRouter({
      routesFolder: 'src/pages',
    }),
    AutoImport({
      dts: true,
      imports: ['vue', '@vueuse/core', VueRouterAutoImports, 'vue-i18n',],
    }),
    Components({
      resolvers: [
        VueUseComponentsResolver(),
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '/@src/',
        replacement: `/src/`,
      },
    ],
  },
  build: {
    assetsInlineLimit: 0, // This ensures larger assets (like CSS) are not inlined
    rollupOptions: {
      output: {
        // Make sure assetFileNames is properly configured
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    mimeTypes: {
      'text/css': ['.css'] // Ensure correct MIME type is set for CSS files
    }
  }
})

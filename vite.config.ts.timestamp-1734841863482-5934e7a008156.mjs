// vite.config.ts
import { defineConfig } from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/unplugin-vue-router/dist/vite.js";
import AutoImport from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/unplugin-vue-components/dist/vite.js";
import { VueUseComponentsResolver } from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/unplugin-vue-components/dist/resolvers.js";
import { VueRouterAutoImports } from "file:///D:/PROJECT/MEROS/uzedu-tahlil/node_modules/unplugin-vue-router/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueRouter({
      routesFolder: "src/pages"
    }),
    AutoImport({
      dts: true,
      imports: ["vue", "@vueuse/core", VueRouterAutoImports, "vue-i18n"]
    }),
    Components({
      resolvers: [
        VueUseComponentsResolver()
      ]
    })
  ],
  resolve: {
    alias: [
      {
        find: "/@src/",
        replacement: `/src/`
      }
    ]
  },
  build: {
    assetsInlineLimit: 0,
    // This ensures larger assets (like CSS) are not inlined
    rollupOptions: {
      output: {
        // Make sure assetFileNames is properly configured
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    }
  },
  server: {
    mimeTypes: {
      "text/css": [".css"]
      // Ensure correct MIME type is set for CSS files
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQUk9KRUNUXFxcXE1FUk9TXFxcXHV6ZWR1LXRhaGxpbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUFJPSkVDVFxcXFxNRVJPU1xcXFx1emVkdS10YWhsaWxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1BST0pFQ1QvTUVST1MvdXplZHUtdGFobGlsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IFZ1ZVVzZUNvbXBvbmVudHNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBWdWVSb3V0ZXIoe1xuICAgICAgcm91dGVzRm9sZGVyOiAnc3JjL3BhZ2VzJyxcbiAgICB9KSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ0B2dWV1c2UvY29yZScsIFZ1ZVJvdXRlckF1dG9JbXBvcnRzLCAndnVlLWkxOG4nLF0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyKCksXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogJy9Ac3JjLycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBgL3NyYy9gLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBidWlsZDoge1xuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLCAvLyBUaGlzIGVuc3VyZXMgbGFyZ2VyIGFzc2V0cyAobGlrZSBDU1MpIGFyZSBub3QgaW5saW5lZFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBNYWtlIHN1cmUgYXNzZXRGaWxlTmFtZXMgaXMgcHJvcGVybHkgY29uZmlndXJlZFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgbWltZVR5cGVzOiB7XG4gICAgICAndGV4dC9jc3MnOiBbJy5jc3MnXSAvLyBFbnN1cmUgY29ycmVjdCBNSU1FIHR5cGUgaXMgc2V0IGZvciBDU1MgZmlsZXNcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlSLFNBQVMsb0JBQW9CO0FBQzlTLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxnQ0FBZ0M7QUFDekMsU0FBUyw0QkFBNEI7QUFHckMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osVUFBVTtBQUFBLE1BQ1IsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFNBQVMsQ0FBQyxPQUFPLGdCQUFnQixzQkFBc0IsVUFBVztBQUFBLElBQ3BFLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULHlCQUF5QjtBQUFBLE1BQzNCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLG1CQUFtQjtBQUFBO0FBQUEsSUFDbkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixXQUFXO0FBQUEsTUFDVCxZQUFZLENBQUMsTUFBTTtBQUFBO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

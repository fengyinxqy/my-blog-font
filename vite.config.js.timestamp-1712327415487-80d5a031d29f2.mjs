// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///F:/programming/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/my-blog/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/programming/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/my-blog/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///F:/programming/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/my-blog/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///F:/programming/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/my-blog/vite.config.js";
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiBaseUrl = env.VITE_API_URL;
  return defineConfig({
    plugins: [
      vue(),
      VueDevTools()
    ],
    define: { "process.env.VITE_API_URL": JSON.stringify(apiBaseUrl) },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/variable.scss";'
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      open: true,
      // 自动打开浏览器
      port: 8080,
      // 端口号
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: apiBaseUrl,
          changeOrigin: true
        },
        "/ws": {
          target: "ws://127.0.0.1:7001",
          changeOrigin: true,
          ws: true
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxwcm9ncmFtbWluZ1xcXFxcdTUyNERcdTdBRUZcdTVCNjZcdTRFNjBcXFxcbXktYmxvZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxccHJvZ3JhbW1pbmdcXFxcXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwXFxcXG15LWJsb2dcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Byb2dyYW1taW5nLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVBRCVBNiVFNCVCOSVBMC9teS1ibG9nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgY29uc3QgYXBpQmFzZVVybCA9IGVudi5WSVRFX0FQSV9VUkxcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBWdWVEZXZUb29scygpXG4gICAgXSxcbiAgICBkZWZpbmU6IHsgJ3Byb2Nlc3MuZW52LlZJVEVfQVBJX1VSTCc6IEpTT04uc3RyaW5naWZ5KGFwaUJhc2VVcmwpIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZS92YXJpYWJsZS5zY3NzXCI7J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBvcGVuOiB0cnVlLCAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcbiAgICAgIHBvcnQ6IDgwODAsIC8vIFx1N0FFRlx1NTNFM1x1NTNGN1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBhcGlCYXNlVXJsLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAnL3dzJzoge1xuICAgICAgICAgIHRhcmdldDogJ3dzOi8vMTI3LjAuMC4xOjcwMDEnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUyxTQUFTLGVBQWUsV0FBVztBQUU5VSxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFKNkksSUFBTSwyQ0FBMkM7QUFPdE4sSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRTNCLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsUUFBTSxhQUFhLElBQUk7QUFDdkIsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFFBQVEsRUFBRSw0QkFBNEIsS0FBSyxVQUFVLFVBQVUsRUFBRTtBQUFBLElBQ2pFLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFFBQ2hCO0FBQUEsUUFDQSxPQUFPO0FBQUEsVUFDTCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsUUFDTjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==

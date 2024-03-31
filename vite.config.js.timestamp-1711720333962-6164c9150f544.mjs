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
          additionalData: `@import "@/assets/style/variable.scss";`
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
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxwcm9ncmFtbWluZ1xcXFxcdTUyNERcdTdBRUZcdTVCNjZcdTRFNjBcXFxcbXktYmxvZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxccHJvZ3JhbW1pbmdcXFxcXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwXFxcXG15LWJsb2dcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Byb2dyYW1taW5nLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVBRCVBNiVFNCVCOSVBMC9teS1ibG9nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgY29uc3QgYXBpQmFzZVVybCA9IGVudi5WSVRFX0FQSV9VUkxcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBWdWVEZXZUb29scygpLFxuICAgIF0sXG4gICAgZGVmaW5lOiB7ICdwcm9jZXNzLmVudi5WSVRFX0FQSV9VUkwnOiBKU09OLnN0cmluZ2lmeShhcGlCYXNlVXJsKSB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGUvdmFyaWFibGUuc2Nzc1wiO2BcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgb3BlbjogdHJ1ZSwgLy8gXHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICBwb3J0OiA4MDgwLCAvLyBcdTdBRUZcdTUzRTNcdTUzRjdcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogYXBpQmFzZVVybCxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJTLFNBQVMsZUFBZSxXQUFXO0FBRTlVLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUo2SSxJQUFNLDJDQUEyQztBQU90TixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFM0IsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxRQUFNLGFBQWEsSUFBSTtBQUN2QixTQUFPLGFBQWE7QUFBQSxJQUNsQixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0EsUUFBUSxFQUFFLDRCQUE0QixLQUFLLFVBQVUsVUFBVSxFQUFFO0FBQUEsSUFDakUsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=

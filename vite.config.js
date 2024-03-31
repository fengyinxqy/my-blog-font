import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd())
  const apiBaseUrl = env.VITE_API_URL
  return defineConfig({
    plugins: [
      vue(),
      VueDevTools()
    ],
    define: { 'process.env.VITE_API_URL': JSON.stringify(apiBaseUrl) },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/variable.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true, // 自动打开浏览器
      port: 8080, // 端口号
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true
        }
      }
    }
  })
}

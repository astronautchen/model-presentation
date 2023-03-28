import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
// import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import Unocss from 'unocss/vite';
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/mixin.scss" as *;@use "@/styles/variables.scss" as *;'
      }
    }
  },
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: []
    // }),
    Components({
      resolvers: []
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      shortcuts: {
        frc: 'flex items-center justify-center',
        fcc: 'flex flex-col items-center justify-center',
        fcb: 'flex flex-col items-center justify-between',
        frb: 'flex items-center justify-between',
        fre: 'flex items-center justify-evenly',
        full: 'w-full h-full',
        cp: 'cursor-pointer'
      },
      rules: [
        ['round', { 'border-radius': '50%' }],
        ['r6', { 'border-radius': '6px' }],
        ['shadow', { 'box-shadow': '0px 2px 6px 0px #f0f0f5' }]
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    }),
    PkgConfig(),
    OptimizationPersist(),
    VitePluginHtmlEnv({
      compiler: true
    })
  ],
  server: {
    port: 8081, //启动端口
    host: '0.0.0.0',
    // hmr: {
    //   host: 'localhost',
    //   port: 8081
    // },
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
        // rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
});

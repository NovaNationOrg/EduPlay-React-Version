import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import {fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [
    react(),
    VitePWA({ 
      injectRegister: 'script',
      manifest:{
        
        icons:[
          {
          "src": "/web-app-manifest-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/web-app-manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
        theme_color:"#181818",
      },
      registerType: 'autoUpdate',
      devOptions:{
        enabled:true
      } ,
      workbox:{
        globPatterns: ['**/*.{js,ts,css,html,ico,png,svg,wasm,ttf}'],
        
        runtimeCaching:[
          {
          urlPattern: ({ url }) => {
              return url.pathname.startsWith("/npm/zxing-wasm@2.1.0/dist/reader/zxing_reader.wasm")
          },
          handler: "CacheFirst" as const,
          options:{   
            cacheName: "zxing-cache",
            cacheableResponse: {
              statuses: [0,200]
            },
            expiration:{
              maxEntries:1,
            }
          }
        },
        ]
      }

    }
    )
  ], resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
  
})



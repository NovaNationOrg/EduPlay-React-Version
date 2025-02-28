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
        runtimeCaching:[{
          urlPattern: ({ url }) => {
              return url.pathname.startsWith("/src")
          },
          handler: "CacheFirst" as const,
          options:{
            cacheName: "general-cache",
            cacheableResponse: {
              statuses: [0,200]
            }
          }
        }]
      }
    }
    )
  ], resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
  
})



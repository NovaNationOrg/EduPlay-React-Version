import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import {fileURLToPath, URL } from 'node:url'
import replace from '@rollup/plugin-replace'

// https://vite.dev/config/
// export default defineConfig({
  
//   plugins: [
//     react(),
//     VitePWA({ 
//       injectRegister: 'script',
//       manifest:{
        
//         icons:[
//           {
//           "src": "/web-app-manifest-192x192.png",
//           "sizes": "192x192",
//           "type": "image/png",
//           "purpose": "maskable"
//         },
//         {
//           "src": "/web-app-manifest-512x512.png",
//           "sizes": "512x512",
//           "type": "image/png",
//           "purpose": "maskable"
//         }
//       ],
//         theme_color:"#181818",
//       },
//       registerType: 'autoUpdate',
//       devOptions:{
//         enabled:true
//       } ,
//       workbox:{
//         globPatterns: ['**/*.{js,ts,css,html,ico,png,svg,wasm,ttf}'],
        
//         runtimeCaching:[
//           {
//           urlPattern: ({ url }) => {
//               return url.pathname.startsWith("/npm/zxing-wasm@2.1.0/dist/reader/zxing_reader.wasm")
//           },
//           handler: "CacheFirst" as const,
//           options:{   
//             cacheName: "zxing-cache",
//             cacheableResponse: {
//               statuses: [0,200]
//             },
//             expiration:{
//               maxEntries:1,
//             }
//           }
//         },
//         ]
//       }

//     }
//     )
//   ], resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
  
  
// })

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

const pwaOptions: Partial<VitePWAOptions> = {
  injectRegister: 'script',
  manifest:{
    icons:[
    {
      "src": "/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
    theme_color:"#181818",
  },
  registerType: 'prompt',
  devOptions:{
    enabled:true
  } ,
}

export default defineConfig({
  plugins: [react(),
            VitePWA(pwaOptions),
            replace(replaceOptions),
  ],resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
})

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
  pwaOptions.injectManifest = {
    minify: false,
    enableWorkboxModulesLogs: true,
  }
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function portfolioDevServerPlugin() {
  return {
    name: 'portfolio-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/dev-status' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ isDev: true, canSaveToDisk: true }))
          return
        }

        if (req.url === '/api/save-portfolio-data' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filePath = path.resolve(__dirname, 'src/data/defaultData.js')
              const content = `export const DEFAULT_PORTFOLIO_DATA = ${JSON.stringify(data, null, 2)};\n`
              fs.writeFileSync(filePath, content, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Saved to defaultData.js successfully!' }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
          return
        }

        if (req.url === '/api/save-image' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { dataUrl, filename } = JSON.parse(body)
              if (!dataUrl) throw new Error('Missing dataUrl')
              const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
              if (!matches || matches.length !== 3) {
                throw new Error('Invalid base64 data')
              }
              const ext = matches[1].split('/')[1] === 'jpeg' ? 'jpg' : (matches[1].split('/')[1] || 'png')
              const safeName = filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : `upload_${Date.now()}`
              const finalFilename = `${safeName}.${ext}`
              const imagesDir = path.resolve(__dirname, 'public/images')
              if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true })
              }
              const filePath = path.join(imagesDir, finalFilename)
              fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, url: `/images/${finalFilename}` }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
          return
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), portfolioDevServerPlugin()],
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const isVercel = process.env.VERCEL === '1'
const publicBase = isVercel ? '' : '/kresko'

function prefixPublicAssets() {
  return {
    name: 'prefix-public-assets',
    closeBundle() {
      const distDir = path.resolve('dist')
      const files = []
      const visit = (directory) => {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
          const fullPath = path.join(directory, entry.name)
          if (entry.isDirectory()) visit(fullPath)
          else if (/\.(js|css|html)$/.test(entry.name)) files.push(fullPath)
        }
      }
      visit(distDir)
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8')
        const rewritten = content.replace(/(["'(])\/(images|certificates)\//g, (_match, quote, assetType) => `${quote}${publicBase}/${assetType}/`)
        if (rewritten !== content) fs.writeFileSync(file, rewritten)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: isVercel ? '/' : '/kresko/',
  plugins: [react(), prefixPublicAssets()],
})

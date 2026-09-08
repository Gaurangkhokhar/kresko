import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

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
        const rewritten = content
          .replace(/(["'(])\/(images|certificates)\//g, '$1/kresko/$2/')
        if (rewritten !== content) fs.writeFileSync(file, rewritten)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/kresko/',
  plugins: [react(), prefixPublicAssets()],
})

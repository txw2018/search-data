import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { readFileSync } from 'fs';
import { read, utils } from 'xlsx';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.xlsx'], // xlsx file should be treated as assets

  plugins: [vue(), vueJsx(), 
   { // this plugin handles ?sheetjs tags
    name: "vite-sheet",
    transform(code, id) {
      if(!id.match(/\?sheetjs$/)) return;
      var wb = read(readFileSync(id.replace(/\?sheetjs$/, "")));
      var data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      return `export default JSON.parse('${JSON.stringify(data)}')`;
    }
  }],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

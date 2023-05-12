import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import ViteYaml from '@modyfi/vite-plugin-yaml';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    ViteYaml()],
  assetsInclude: ['**/*.geojson']
})


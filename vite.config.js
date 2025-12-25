import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Update `base` if you rename the repository. For GitHub Pages project sites,
// this should be `/<repo-name>/`.
const repoName = 'KZesty.github.io';

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
});

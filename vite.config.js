import {defineConfig} from 'vite';

export default defineConfig(() => ({
  esbuild: {
    loader: "jsx",
    jsxFactory: "orve.Node",
    jsxFragment: "orve.Fragment",
    jsxInject: "import orve from 'orve'"
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
}));
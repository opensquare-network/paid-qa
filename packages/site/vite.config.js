import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import svgr from "vite-plugin-svgr";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { viteStaticCopy } from "vite-plugin-static-copy";

const alias = (alias) => path.resolve(__dirname, alias);

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // because we need to import svg files via js
    viteStaticCopy({
      targets: [
        {
          src: "src/imgs",
          dest: "",
        },
      ],
    }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      components: alias("src/components"),
      imgs: alias("src/imgs"),
      pages: alias("src/pages"),
      store: alias("src/store"),
      services: alias("src/services"),
      utils: alias("src/utils"),
      "@osn/common-ui/es": alias("node_modules/@osn/common-ui/dist/esm"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [NodeModulesPolyfillPlugin({})],
    },
  },
});

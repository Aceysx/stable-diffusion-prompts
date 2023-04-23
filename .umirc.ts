import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'npm',
  proxy:{
      '/tool-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
    }
  },
  favicons: ['/assert/tool.png' ]

});

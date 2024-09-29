import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
import { htmlReplace } from "./src/plugins/htmlReplace";
import { version } from "./package.json";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import commonjs from 'vite-plugin-commonjs';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode);
  return {
    build: {
      minify: false,
      cssCodeSplit: false,
      sourcemap: true,
      assetsDir: "static",
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 将 node_modules 中的第三方库打包到 vendor 文件中
            if (id.includes('node_modules')) {
              return 'vendor';
            } else {
              return 'index'
            }
          }
        },
      },
    },
    server: {
      proxy: {
        "/userApi": {
          target: "http://47.109.137.136:7011",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/userApi/, ""),
        },
      },
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    optimizeDeps: {
      include: ["v-charts", "echarts"],
    },

    plugins: [
      commonjs(),
      vue(),
      // 注册所有的svg文件生成svg雪碧图
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")], // icon存放的目录
        symbolId: "icon-[name]", // symbol的id
        inject: "body-last", // 插入的位置
        customDomId: "__svg__icons__dom__", // svg的id
      }),
      htmlReplace(),

      // svgSymbolLoader({
      //   svgDir: path.resolve(__dirname, "src/icons/svg"),
      //   customContainerId: "_svg_icon_container_",
      // }),
    ],
  };
});

import { reslove } from "path";
import { readdirSync, readFileSync } from "fs";

/**
 *
 * @param { {svgDir: string, customContainerId: string} } options
 * @returns
 */
export function svgSymbolLoader(options) {
  const { svgDir, customContainerId } = options;
  return {
    name: "svg-symbol-loader",
    transformIndexHtml(html) {
      // 指定SVG文件夹路径
      const svgFolder = svgDir;

      // 获取所有SVG文件
      const svgFiles = readdirSync(svgFolder).filter((file) =>
        file.endsWith(".svg")
      );

      // 将SVG文件内容转换为<symbol>格式并组合
      const svgSymbols = svgFiles
        .map((file) => {
          const svgContent = readFileSync(`${svgFolder}/${file}`, "utf-8");
          const symbolId = `icon-${file.replace(".svg", "")}`;
          // 替换<svg>标签为<symbol>
          return svgContent
            .replace("<svg", `<symbol id="${symbolId}"`)
            .replace("</svg>", "</symbol>");
        })
        .join("");

      // 将<symbol>注入到页面<body>开头
      const svgContainer = `<svg id="${customContainerId}" style="position: absolute; width: 0; height: 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          ${svgSymbols}
        </svg>`;

      return html.replace("<body>", `<body>${svgContainer}`);
    },
  };
}

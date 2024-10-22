const CDN_MAP = {
  test: "https://cdn.wudianxiaban.com",
  production: "https://cdn.pokidol.com",
};
export function htmlReplace(options) {
  let mode = "development";
  return {
    name: "html-replace",
    config: (config, options) => {
      mode = options.mode;
      return config;
    },
    transformIndexHtml(html) {
      let cdnUrl = "";

      if (mode === "production" || mode === "test") {
        cdnUrl = CDN_MAP[mode] + "/pokidol/portal/dist/'+${version}+'";
        return (
          html
            .replace(
              /<!--Inject ElementContentList-->/,
              '<script type="text/javascript"> var elementContentList = [(${elementContentMap})]; </script>'
            )
            // 替换 script 标签的 src 为 th:src，同时保留其他属性
            .replace(
              /<script(.*?)src="\/static\/([^\/]+-\w+\.js)"(.*?)><\/script>/g,
              (match, p1, p2, p3) => {
                return `<script${p1}th:src="'${cdnUrl}/static/${p2}'"${p3}></script>`;
              }
            )
            // 替换 link 标签的 href 为 th:href，同时保留其他属性
            .replace(
              /<link(.*?)href="\/static\/([^\/]+-\w+\.css)"(.*?)>/g,
              (match, p1, p2, p3) => {
                return `<link${p1}th:href="'${cdnUrl}/static/${p2}'"${p3}>`;
              }
            )
            // 替换 link rel="icon" 的 href 为 th:href，同时保留其他属性
            .replace(
              /<link(.*?)rel="icon"(.*?)href="\/favicon.ico"(.*?)>/g,
              (match, p1, p2, p3) => {
                return `<link${p1}rel="icon"${p2}th:href="'${cdnUrl}/favicon.ico'"${p3}>`;
              }
            )
            .replace(
              /<html lang="en">/g,
              '<html lang="en" xmlns:th="http://www.thymeleaf.org">'
            )
            //<link rel="modulepreload" crossorigin href="/static/index-1e7b6b7e.js">
            .replace(
                /<link(.*?)rel="modulepreload"(.*?)href="\/static\/([^\/]+-\w+\.js)"(.*?)>/g,
                (match, p1, p2, p3, p4) => {
                    return `<link${p1}rel="modulepreload"${p2}th:href="'${cdnUrl}/static/${p3}'"${p4}>`;
                }
            )
        );
      }
      return html;
    },
  };
}

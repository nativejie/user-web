const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// 配置静态文件目录
console.log(__dirname)
app.use(express.static(path.join(__dirname, '.')));

// 配置接口转发，将所有访问 a.com 的请求转发到 b.com
app.use('/hom', createProxyMiddleware({
    target: 'http://47.109.137.137:7010',  // 目标服务器
    changeOrigin: true,       // 确保主机头的来源是目标服务器
    // pathRewrite: { '^/api': '' }  // 将 /api 前缀移除
}));

// 启动服务器
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

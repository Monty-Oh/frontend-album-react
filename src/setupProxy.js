const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = process.env.PROXY;
module.exports = function (app) {
    app.use('/api',
        createProxyMiddleware({
            target: proxy,
            changeOrigin: true,
            pathRewrite: { '^/api': '/' }
        })
    );
}
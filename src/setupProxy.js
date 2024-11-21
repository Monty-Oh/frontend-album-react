const {createProxyMiddleware} = require("http-proxy-middleware");

const proxy = process.env.PROXY;

module.exports = function (app) {
    app.use(
        "/",
        createProxyMiddleware({
            proxy,
            changeOrigin: true
        })
    );
};
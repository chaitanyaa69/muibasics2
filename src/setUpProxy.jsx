const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://664af189a300e8795d43864b.mockapi.io/crud-op/1',
      changeOrigin: true,
    })
  );
};
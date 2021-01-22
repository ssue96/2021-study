const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {

  app.use(createProxyMiddleware( '/result',{  
      target: 'http://52.78.181.224:5000/',
      changeOrigin: true,
      secure: false
    })
  );
};

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/database', { target: 'http://localhost:9000/' }));
};
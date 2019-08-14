const Router = require('koa-router');
const api = new Router();

const user = require('./user');

api.use('/user',user.routes());

api.get('/test', ctx=>{
    ctx.body = 'test 성공';
})

module.exports = api;
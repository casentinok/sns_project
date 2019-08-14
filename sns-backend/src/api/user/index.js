const Router = require('koa-router');
const userCtrl = require('./user.ctrl');
const user = new Router();

const {upload} = require('lib/uploader');

user.post('/',upload.single('file'),userCtrl.join);
user.post('/login',userCtrl.login);
user.get('/logout', userCtrl.logout);
user.get('/uinfo/:id', userCtrl.read);
//user.patch('/:userid', userCtrl.update);
user.get('/check',userCtrl.check);
user.post('/check',userCtrl.overlap);

module.exports = user;
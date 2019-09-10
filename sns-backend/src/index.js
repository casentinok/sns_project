require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");


const { jwtMiddleware } = require('lib/token');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser : true }).then(()=>{
    console.log('connected to mongodb');
}).catch(e=>{
    console.error(e);
});

const api = require('./api');

const app = new Koa();
const router = new Router();

app.use(cors());

router.get('/',(ctx,next)=>{  
    ctx.body="home";
    next();
});

app.use(bodyParser());
app.use(jwtMiddleware);
// app.keys = [process.env.COOKIE_SIGN_KEY];
router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods);

app.listen(process.env.PORT, () => {
    return console.log(`listening to port ${process.env.PORT}`);
});
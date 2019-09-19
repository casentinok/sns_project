const User = require("models/user");
const Joi = require("@hapi/joi");
/*
    회원가입
    POST api/user/
*/
exports.join = async ctx => {
  const schema = Joi.object().keys({
    userid: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string()
      .regex(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/).required(),
    phone: Joi.string().required()
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { userid, password, name, email, phone } = ctx.request.body;
  const imgname  = ctx.file.filename;
  console.log(ctx.request.body);
  console.log(imgname);
  const user = new User({
    userid,
    password,
    name,
    email,
    phone,
    profile : {imgname}
  });

  try {
    await user.save();
    ctx.status = 200;
    //ctx.body = user;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
/*
    로그인
    POST api/user/login  
*/
exports.login = async ctx => {
  console.log("login work");
  const schema = Joi.object().keys({
    userid: Joi.string().required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    return;
  }
  const { userid, password } = ctx.request.body;
  let user = null;

  try {
    user = await User.findOne({ userid: userid });
    if (!user || user.password !== password) {
      console.log("\n\n");
      ctx.status = 403;      
      return;
    }
  } catch (e) {
    ctx.throw(e, 401);
  }
  let token = null;
  try {
    token = await user.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.cookies.set("auth_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 1
  });
  console.log(user._id);
  ctx.body = {
    _id: user._id,
    name: user.name,
    profile: user.profile.imgname,
    success : true
  };
};

/*
    로그아웃
    POST api/user/logout
*/

exports.logout = async ctx => {
  ctx.cookies.set("auth_token", null, { maxAge: 0, httpOnly: true });
  ctx.status = 204;
};

/*
    정보수정
    PATCH api/user/:userid
*/
exports.update = async ctx => {
  const { userid } = ctx.params;
  try {
    const user = await User.updateOne({ userid }, ctx.request.body, {
      new: true
    });
    if (!user) {
      ctx.status = 404;
      return;
    }
    ctx.body = user;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
/*
    회원정보 출력
    POST api/user/uinfo/
*/
exports.read = async ctx => {
  const { id } = ctx.params;
  //const  id = ctx.query.id;
  //const {id} = ctx.request.body;

  const { user } = ctx.request;
  if (!user) return; // 토큰이 존재할떄만

  let result = null;
  try {
    result = await User.findOne({ _id: id });
    if (!result) {
      ctx.status = 404;
      return;
    }
    const { userid, name, email, phone, board } = result;
    ctx.status = 200;

    ctx.body = {
      userid,
      name,
      email,
      phone,
      board
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
  로그인 체크
  GET api/user/check
*/
exports.check = ctx => {
  console.log('check');
  const { user } = ctx.request;
  console.log(user);
  if (!user) {
    //ctx.status = 403;
    ctx.body = {
      logout : true
    };
    return;
  }
  ctx.body = {
    _id: user._id,
    name: user.name,
    profile: user.profile
  };
};
/*
   중복체크
 POST api/user/check
*/
exports.overlap = async ctx => {
  let result = null;
  const { name, value } = ctx.request.body;  
  if (!name || !value) {
    ctx.status = 404;
    return;
  }

  try {
    result = await User.findOne({ [name]: value });
    if (!!result) {
      ctx.body={
        error : true
      }
      return;
    }
    ctx.status = 200;
    ctx.body = {
      error : false
    }
  } catch (e) {console.log(e)}

};

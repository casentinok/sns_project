const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}
exports.generateToken = generateToken;

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

exports.jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("auth_token");
  if (!token) return next();
  try {
    const decoded = await decodeToken(token);
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 1) {
      const { _id, name, profile } = decoded;
      const freshToken = await generateToken({ _id, name, profile }, "auth");
      ctx.cookies.set("auth_token", freshToken, {
        maxAge: 1000 * 60 * 60 * 1, //'1hour'
        httpOnly: true
      });
    }
    console.log(decoded);
    ctx.request.user = decoded;
    await next();
  } catch (e) {
    ctx.request.user = null;
  }
};

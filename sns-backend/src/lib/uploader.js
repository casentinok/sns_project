const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, resolveApp("../sns-frontend/public/img"));
  },
  filename: function(req, file, cb) {
      cb(null,file.fieldname+'-'+Date.now()+'-'+file.originalname);
  }
});

const upload = multer({
  storage : storage
});
exports.upload = upload;

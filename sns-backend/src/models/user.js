const mongoose = require("mongoose");
const { Schema } = mongoose;

const { generateToken } = require("lib/token");

const User = new Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowecase: true },
  phone: { type: String, unique:true },
  profile: {
    imgname: { type: String },
    publishedDate: { type: Date, default : new Date() }
  },
  board : [{
      _id : Schema.Types.ObjectId,
      title : String,
      thumbimg : String  
  }]  
});

User.methods.generateToken= function(){
  const payload = {
    _id: this._id,
    name : this.name
  };

  return generateToken(payload, "auth");
}
module.exports = mongoose.model('User',User);
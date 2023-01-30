const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim:true},
  email: { type: String, unique: true, required: true },
  categories:[{
    type:String
  }],
  password: { type: String, required: true}
},{
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);

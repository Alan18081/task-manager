const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  name: String,
  email: String,
  birth: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  online: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.encryptPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);

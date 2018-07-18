const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
	name: String,
	email: String,
	birth: String,
	isAdmin: Boolean
});

module.exports = mongoose.model('User',UserSchema);
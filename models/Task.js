const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
	title: String,
	description: String,
	status: String,
	esitmateTime: Boolean,
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
	creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
	workerId: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Task',TaskSchema);
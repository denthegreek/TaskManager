const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	description:{
		type: String,
		required: true
	},
	isDone:{
		type: Boolean,
		required:true
	}
});

const Task = module.exports = mongoose.model('Task', TaskSchema);
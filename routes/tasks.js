const Task = require('../models/Task');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.get('/tasks',requireLogin,async (req,res) => {
		try {
			const tasks = await Task.find({

			});
		}
		catch (e) {
			res.sendStatus(500);
		}
	});
};
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const {port} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'/client/build/index.html'));
});

app.get('/*',express.static(path.join(__dirname,'/client/build/static')));

app.listen(port,() => {
	console.log('Server is listening at port ' + port);
});
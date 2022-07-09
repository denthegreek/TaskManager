const express=require('express');
const router = express.Router();

const cors=require('cors');

const Task = require('./models/task.js');

router.use(cors());

//retrieve tasks:
router.get('/task',(req, res, next)=>{
	var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric',minute: 'numeric' , second: "numeric"};
	var today  = new Date();

	console.log("--Get Request--\t" + String(today.toLocaleDateString("en-US", options)));
	console.log();
	Task.find(function(err, tasks){
		res.json(tasks);
	});
});

//add task:
router.post('/task',(req, res, next)=>{
	var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric',minute: 'numeric' , second: "numeric"};
	var today  = new Date();

	console.log("Inserting:\t" + String(today.toLocaleDateString("en-US", options)));
	console.log(req.body);
	console.log();
	let newTask = new Task({
		description: req.body.description,
		isDone: req.body.isDone
	});
	newTask.save((err, task)=>{
		if(err){
			res.json({msg: 'Failed to add task!'});
		}
		else{
			res.json({msg: 'Contact added successfully'});
		}
	});

	//---------------------------------------------------------------------Email to Inform on Insertion:

	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: '****************',
	  auth: {
	    user: '****************',
	    pass: '****************'
	  }
	});

	var mailOptions = {
	  from: '****************',
	  to: '****************',
	  subject: 'New Insertion (ΔΝ Task Manager)',
	  text: 'Hello Dimostenis,\n\nThis is an automated message. Please do not respond or reply.\nDescription: '+req.body.description+'\n\nThank you,\nΔΝ Task Manager'
	};

	var timer=0;
	if(timer==0){
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  }
		});
	}
	timer++;

	//---------------------------------------------------------------------

});

//delete task:
router.delete('/task/:description',(req, res, next)=>{
	var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric',minute: 'numeric' , second: "numeric"};
	var today  = new Date();

	console.log("Deleting:\t" + String(today.toLocaleDateString("en-US", options)));
	console.log(req.params.description);
	console.log();
	Task.deleteOne({ description: req.params.description},function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
	//---------------------------------------------------------------------Email to Inform on Deletion:
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: '****************',
	  auth: {
	    user: '****************',
	    pass: '****************'
	  }
	});

	var mailOptions = {
	  from: '****************',
	  to: '****************',
	  subject: 'Deletion of a Task (ΔΝ Task Manager)',
	  text: 'Hello Dimostenis,\n\nThis is an automated message. Please do not respond or reply.\nDeleted: '+req.params.description+'\n\nThank you,\nΔΝ Task Manager'
	};

	var timer=0;
	if(timer==0){
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  }
		});
	}
	timer++;
	//---------------------------------------------------------------------
});

//update task:
router.put('/task/', function (req, res) {
	var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric',minute: 'numeric' , second: "numeric"};
	var today  = new Date();

	console.log("Updating:\t" + String(today.toLocaleDateString("en-US", options)));
	console.log("\""+req.body.description+"\""+" status to "+ String(req.body.isDone));
	console.log();
	let ToF=false;
	if(req.body.isDone==false){
		ToF=true;
	}
	Task.updateOne({description:req.body.description,isDone:ToF},{description:req.body.description,isDone:req.body.isDone},function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
	//---------------------------------------------------------------------Email to Inform on Change of Status:
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: '****************',
	  auth: {
	    user: '****************',
	    pass: '****************'
	  }
	});

	var mailOptions = {
	  from: '****************',
	  to: '****************',
	  subject: 'Change of a Task Status (ΔΝ Task Manager)',
	  text: 'Hello Dimostenis,\n\nThis is an automated message. Please do not respond or reply.\nChange on: '+req.body.description+'\nNew Status is:'+req.body.isDone+'\n\nThank you,\nΔΝ Task Manager'
	};

	var timer=0;
	if(timer==0){
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  }
		});
	}
	timer++;
	//---------------------------------------------------------------------
}); 

router.get('/mail',(req, res, next)=>{
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: '****************',
	  auth: {
	    user: '****************',
	    pass: '****************'
	  }
	});

	var mailOptions = {
	  from: '****************',
	  to: '****************',
	  subject: 'Sending Email using Node.js',
	  text: 'This is an automated message. Please do not respond. Thank you.-------'
	};

	var timer=0;
	if(timer==0){
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
	}
	timer++;
});

module.exports = router;

//--- db connection: ---
const express=require('express');
const app = express();

const mongoose=require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');

const cors=require('cors');
const bodyparser = require('body-parser');
const path =require('path');

const port=8800;

const route = require('./route.js');

app.use(express.json());

dotenv.config();

app.use('/api', route);

app.use(cors());

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected',()=>{
	console.log("\nConnected successfully!\n");
});
mongoose.connection.on('connected',(err)=>{
	if(err){
		console.log("Errpr:"+err);
	}
});

app.get('/',(req,res)=>{
	res.send('foo');
});

app.listen(port,()=>{
	console.log("The backend is working!");
	console.log("Server is running on port: "+port)
});

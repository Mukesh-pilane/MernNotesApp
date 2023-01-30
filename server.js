const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoute');
const noteRoutes = require('./routes/noteRoute');
require("./config/database").connect();
const app = express();
app.use(cors());
app.use(express.json()); 
//user Routes
app.use('/users', userRoutes);
//note Routes
app.use('/notes', noteRoutes);

//port abd api constants
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//listen port
app.listen(port, ()=>{
	console.log("listening on port", port)	
})



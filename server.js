require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');
//const routes =  require('./routes');

const cors = require('cors');

const MONGO = process.env.MONGODB_URI

mongoose.connect(MONGO,{ useNewUrlParser: true, useCreateIndex:true });
const mongo =  mongoose.connection;

mongo.on('error', (error) => console.log(error))
	 .once('open', () => console.log("Connected to database"));


const app = express()

const PORT = process.env.PORT || 8080


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'));

//app.use('/api/v1',routes)

app.get('/',(req,res) => {
	res.send("Hello World")
})

app.listen(PORT,() =>{
	console.log(`Works in port ${PORT}`)
});

const Joi = require('joi');
const express = require('express');
const app = express();
const log = require('./routes/logger');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Vidly')
.then(()=>{console.log("connected to database")})
.catch(error=>{console.error("did not connect to datbase")})


app.use(express.json());
app.use('/api/genres', log);

const port = process.env.PORT;
app.listen(port,()=>{console.log(`you are listening to port  ${port}`)});

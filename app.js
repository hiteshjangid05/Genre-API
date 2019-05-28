const Joi = require('joi');
const express = require('express');
const app = express();
const log = require('./routes/logger');

app.use(express.json());
app.use('/api/genres', log);

const port = process.env.PORT;
app.listen(port,()=>{console.log(`you are listening to ${port}`)});
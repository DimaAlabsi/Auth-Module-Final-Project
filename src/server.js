"use strict";

const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 8080;
require("dotenv").config();

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./auth/middleware/logger');
const v1Routes = require('./auth/routes/v1');
const router= require('./auth/routes/v2')
const authRoutes = require('./auth/routes/routes');
// const router=require('./auth/models/data-collection')



// Prepare the express app
const app = express();


app.get('/',(req,res)=>{
    res.status(200).send("Hello world 🤪")
})
app.get('/status', (req, res) => {

  res.status(200).send({
      "status": "running",
      "port": 8080

  });
})
// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(logger);
// app.use(notFound);
app.use('/api/v1', v1Routes);
app.use('/api/v2', router);
app.use('*', notFound);
app.use(errorHandler);
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};








"use strict";

const { start } = require('./src/server');
const { db } = require('./src/auth/models/index');
const port =process.env.PORT;
// we first connect to the DB, then we run our server
db.sync().then(() => {
  // kickstart the server
  start(port); // will start our server
}).catch(console.error);



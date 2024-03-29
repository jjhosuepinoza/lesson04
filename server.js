const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
// const { application } = require('express');

const port = process.env.PORT || 5050;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://cse341-contacts-frontend.netlify.app');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE, OPTIONS'); 

  
  
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

const express = require('express')
const app = express();
const morgan = require('morgan')
const { db } = require('./models');
const layout = require ('./views/layout')

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan('dev'));

app.use(express.static(__dirname + "/stylesheets"));

app.get('', (req,res) => {
   

})

app.listen(3000, () => {
    console.log('App listening in port 3000');
  });
  

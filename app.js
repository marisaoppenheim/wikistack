const express = require('express')
const app = express();
const morgan = require('morgan')
const db = require('./models').db;
const layout = require ('./views/layout')
const bodyParser = require('body-parser');

db.authenticate().
then(() => {
  console.log('connected to the database');
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + "/stylesheets"));

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

app.get('/', (req, res) => {
  res.redirect('./wiki')
})

const init = async () => {
  await db.sync()
  app.listen(3000, () => {
    console.log('App listening in port 3000');
})
  }

init()

  

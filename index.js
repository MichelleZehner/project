const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017' 

app.set('view engine', 'pug');

app.use('/assets', express.static('public'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/contact', (req, res) => {
  res.render('contact'); 
});

app.get('/spa', (req, res) => {
  res.render('spa'); 
});

app.get('/consent', (req, res) => {
  res.render('consent'); 
});

app.post('/contact', urlencodedParser, (req, res) => {
  let person = {};
  person.firstname = req.body.firstname;
  person.lastname = req.body.lastname;
  person.email = req.body.email;
  person.phonenumber = req.body.phonenumber;
  person.gender = req.body.gender;
  person.age = req.body.age;
  person.comments = req.body.comments;

  MongoClient.connect(url, {useNewUrlParser: true}).then ( (client) => {
    client.db("contact").collection("info").insertOne(person)
    client.close
  })
  .catch( (err)=> {
    console.log(err);
  });

  res.render('response') 
});

app.listen(3000);
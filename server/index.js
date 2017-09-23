const express = require('express');
const gitRequest = require('./git_request');
const db = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/repos', function (req, res) {


  var username = req.url.split('?')[1];
  
  gitRequest.gitRequest(username);

  res.send();
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/', function (req, res) {

	res.redirect('/repos');
})

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.Repo.find().limit(25).exec((err, data) => {
    if (err) console.log('error on repo query', err);
    console.log(typeof data);    
    let result = [];
    for (var i in data) {
      result.push(JSON.parse(data[i].repo))
    }
  	res.status(200).send(result);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


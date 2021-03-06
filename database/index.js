'use strict';
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/fetcher');

//mongoose.on('error', console.error.bind(console, 'connection error:'));

// mongoose.once('open', function() {
//   // we're connected!
//   console.log('the database is UP')
//});

let userSchema = new Schema({
	name: String
})
let User = mongoose.model('User', userSchema);



let repoSchema = new Schema({
  // TODO: your schema here!
  repoId: Number,
  repo: String, 
  userId: String,
  lastPushed: Date
});
let Repo = mongoose.model('Repo', repoSchema);




let save = (username, repo, repoId, lastPushed, last, cb) => {
	let newUser = {
		name: username
	}
  
  User.findOneAndUpdate({name: username}, newUser, {upsert: true, new: true}, function(err, doc) {
    if (err) console.log('there was update error on user');
    
    let userId = doc.id;

    let newRepo = {
    	repoId: repoId,
  	  repo: repo,
  	  userId: userId,
  	  lastPushed: lastPushed
    }
 
    Repo.findOneAndUpdate({repoId: repoId}, newRepo, {upsert: true, new: true}, function(err, doc) {
      if (err) console.log('there was update error on repo', err);
      if (last === true) {
      	cb();
      }
    });
  });
}

module.exports.save = save;
module.exports.User = User;
module.exports.Repo = Repo;
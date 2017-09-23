const request = require('request');
const token = require('./config')
const https = require('https');
const db = require('../database/index');

var gitRequest = function(username) {

  if (!username) {
  	username = 'ddai85';
  }

	const options = {
    host:'api.github.com',
    path: '/users/' + username + '/repos',
    method: 'GET',
    headers: {
    	'user-agent':'ddai85',
      'authorization': 'token ' + token.token
    }
	}

  const req = https.get(options, (res) => {
    console.log('statusCode', res.statusCode);
    var buffer = '';
    res.on('data', (d) => {
      buffer += d;
    });
    res.on('end', () => {
    	repos = JSON.parse(buffer);

    	repos.forEach((repo) => {
    		let repoId = repo.id
    		let repoString = JSON.stringify(repo);
    	  db.save(username, repoString, repoId);
    	})
    })

  });

}


module.exports.gitRequest = gitRequest;
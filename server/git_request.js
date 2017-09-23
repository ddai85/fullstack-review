const request = require('request');
const token = require('./config')
const https = require('https');
const db = require('../database/index');

var gitRequest = function(username, cb) {

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

  const req = https.get(options, (response) => {
    var buffer = '';
    response.on('data', (d) => {
      buffer += d;
    });
    response.on('end', () => {
    	repos = JSON.parse(buffer);
      let length = repos.length;
    	repos.forEach((repo, index) => {
    		let repoId = repo.id
    		let lastPushed = repo.pushed_at;
    		let repoString = JSON.stringify(repo);
    		let last = false;
    		if (index === length - 1) {
    			last = true;
    		}
    	  db.save(username, repoString, repoId, lastPushed, last, cb);
    	})
    })

  });

}


module.exports.gitRequest = gitRequest;
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.fetch = this.fetch.bind(this);
  }

  fetch (username) {
    this.setState({repos: []});
    var context = this;
    $.ajax({
      url: 'http://127.0.0.1:1128/repos?' + username,
      type: 'GET',
      contentType: 'string',

      success: function(data) {
        for (var i in data) {
          let result = context.state.repos;
          result.push(data[i])
          context.setState({repos: result});
        }
      },
      error: function(error) {
        console.log('get request for repos failed', error);
      }
    })
  }

  search (username) {
    var context = this;
    $.ajax({
      url: 'http://127.0.0.1:1128/repos?' + username,
      type: 'POST',
      contentType: 'string',

      success: function(data) {
        console.log('ajax post success', data);
        context.fetch(username);
      },
      error: function(error) {
        console.log('ajax post failed', error);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
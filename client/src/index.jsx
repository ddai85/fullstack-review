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

  fetch () {
    var context = this;
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: 'GET',
      contentType: 'string',

      success: function(data) {
        console.log('we are getting here...')
        for (var i in data) {
          let result = context.state.repos;
          result.push(data[i])
          context.setState({repos: result});
        }
        console.log('current repos:', context.state.repos);
      },
      error: function(error) {
        console.log('get request for repos failed', error);
      }
    })
  }

  search (term) {
    var context = this;
    $.ajax({
      url: 'http://127.0.0.1:1128/repos?' + term,
      type: 'POST',
      contentType: 'string',

      success: function(data) {
        console.log('ajax call success', data);
        context.fetch();
      },
      error: function(error) {
        console.log('ajax call failed', error);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
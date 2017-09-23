import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

class RepoList extends React.Component {

  constructor(props) {
  	super(props);
  	this.state = {}
  }

  render() {
    let rows = [];
  	this.props.repos.forEach(function(repo) {
      rows.push(<RepoListEntry repo={repo} key={repo.id}/>)
  	});

	  return (
		  <div>
		    <h4> Repo List Component </h4>
		    the number of public repos this user has is: {this.props.repos.length}
		    {rows}
		  </div>
	  )
  }
}




export default RepoList;
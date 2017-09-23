import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <h4>{props.repo.name}</h4>
    <div>{props.repo.description}</div>
    <div>User: {props.repo.owner.login}</div>
    <div>Repo ID: {props.repo.id}</div>
    <div><a href={props.repo.html_url}>Go to Repo</a></div>
    <div>Last pushed: {props.repo.pushed_at}</div>
  </div>
)

export default RepoListEntry;
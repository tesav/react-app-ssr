import React from 'react';
import Nav from '../components/Nav'

const E404 = props => (
  <div>
    <Nav />

    <h1>404</h1>
    <p>page not found.</p>
    <p>{props.location.pathname}</p>
  </div>
);

export default E404;

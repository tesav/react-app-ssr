import React from 'react';
import Nav from '../components/Nav'

const About = props => (
  <div>
    <Nav />

    <h1>About</h1>
    <p>Some information about the page</p>
    <p>{props.location.pathname}</p>
  </div>
);

export default About;

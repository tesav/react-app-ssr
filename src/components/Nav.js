import React from 'react'
import { Link } from 'react-router-dom'
import { routeName } from '../app'

const Nav = ({ }) => (
  <div>
    <ul>
      <li><Link to={routeName('home')}>Home</Link></li>
      <li><Link to={routeName('home', { state: { test: 'TEST!' } })}>Home with state</Link></li>
      <li><Link to={routeName('about')}>About</Link></li>
    </ul>

    <hr />
  </div>
)

export default Nav

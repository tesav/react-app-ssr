import React from 'react'
import { Link } from 'react-router-dom'
import { routeName } from '../app'

const Nav = ({ }) => (
  <div>
    <ul>
      <li><Link to={routeName('home')}>Home</Link></li>
      <li><Link to={routeName('home', { state: { test: 'TEST!' } })}>Home with state</Link></li>
      <li><Link to={routeName('about')}>About</Link></li>
      <li><Link to={routeName('about', { params: { filter: 'aaa=bbb=ccc=1,2,3' } }, {encode: false})}>About Filter</Link></li>
    </ul>

    <hr />
  </div >
)

export default Nav

import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import routes from '../routes'

const App = ({ store }) => (
  <React.StrictMode>
    <Provider store={store}>
      <Switch>{routes.map(route => <Route key={route.path} strict={true} exact={true} {...route} />)}</Switch>
    </Provider>
  </React.StrictMode>
)

export default App

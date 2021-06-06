import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

const App = ({ store, routes, children }) => (
  <React.StrictMode>
    <Provider store={store}>
      <Switch>{routes.map(route =>
        <Route key={route.path} strict={false} exact {...route}>{children}</Route>
      )}</Switch>
    </Provider>
  </React.StrictMode>
)

export default App

import React from 'react'
// import '../style/app.less';
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

const App = ({ store, routes, initialProps }) => (
  <React.StrictMode>
    <Provider store={store}>
      <Switch>{routes.map(route => {
        const { component: Cmp, ...rest } = route
        return (
          <Route key={route.path} strict={false} exact {...rest}>
            <Cmp {...initialProps} />
          </Route>
        )
      })}</Switch>
    </Provider>
  </React.StrictMode>
)

export default App

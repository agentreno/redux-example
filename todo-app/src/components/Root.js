import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TodoApp from './TodoApp'

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' render={() => <Redirect to='/all' />} />
                <Route path='/:filter?' component={TodoApp} />
            </Switch>
        </Router>
    </Provider>
)

export default Root

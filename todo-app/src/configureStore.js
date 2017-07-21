import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise'
import todoAppReducer from './reducers/reducers'

// Create augmented store
const configureStore = () => {
    const middlewares = [promise]

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
    }

    return createStore(
        todoAppReducer,
        applyMiddleware(...middlewares)
    )
}

export default configureStore

import { createStore } from 'redux'
import todoAppReducer from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

// Store with persisted state
const configureStore = () => {
    const persistedState = loadState()
    const store = createStore(
        todoAppReducer,
        persistedState
    )

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        })
    }, 1000))

    return store
}

export default configureStore

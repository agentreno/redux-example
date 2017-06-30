import { createStore } from 'redux'

// Reducers map one state to the next given an action and a previous state
// If state is undefined, it should return the initial state
// It must be a pure function (not have side-effects like network requests and
// no modifications to inputs)
const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

const store = createStore(counter)

const render = () => {
    document.body.innerText = store.getState()
}

store.subscribe(render)
render()

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' })
})

import React from 'react'
import { connect } from 'react-redux'

// Global counter
let nextTodoId = 0

// Action creators
const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

// React components
let AddTodo = ({ dispatch }) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node
            }} />
            <button onClick={() => {
                dispatch(addTodo(input.value))
                input.value = ''
            }}>
                Add Todo
            </button>
        </div>
    )
}
AddTodo = connect()(AddTodo)

export default AddTodo

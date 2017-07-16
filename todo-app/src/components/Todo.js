import React from 'react'

// Single Todo component
// Takes the click handler as a prop to make this a pure presentational
// component
const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration:
                completed ?
                'line-through' :
                'none'
        }}
    >
        {text}
    </li>
)

export default Todo

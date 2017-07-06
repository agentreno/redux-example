import React from 'react'
import Todo from './Todo'

// TodoList component
// Takes the click handler as a prop to make this a pure presentational
// component
const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
)

export default TodoList

import { connect } from 'react-redux'
import TodoList from './TodoList'

// Helper to find visible todos given a filter
const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'all':
            return todos
        case 'completed':
            return todos.filter(
                t => t.completed
            )
        case 'active':
            return todos.filter(
                t => !t.completed
            )
        default:
            return todos
    }
}

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(
        state.todos,
        state.visibilityFilter
    )
})

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch({
            type: 'TOGGLE_TODO',
            id
        })
    }
})

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList

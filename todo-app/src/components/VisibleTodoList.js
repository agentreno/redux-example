import { connect } from 'react-redux'
import { withRouter } from 'react-router'
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

const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos( state.todos, match.params.filter || 'all')
})

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch({
            type: 'TOGGLE_TODO',
            id
        })
    }
})

const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList))

export default VisibleTodoList

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers/reducers'

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

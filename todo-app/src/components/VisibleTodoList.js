import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from './TodoList'
import { getVisibleTodos, getIsFetching } from '../reducers/reducers'
import * as actions from '../actions'

class VisibleTodoList extends React.Component {
    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData()
        }
    }

    fetchData() {
        const { filter, fetchTodos } = this.props
        fetchTodos(filter)
    }

    render() {
        const { toggleTodo, todos, isFetching } = this.props
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }

        return (
            <TodoList
                todos={todos}
                onTodoClick={toggleTodo}
            />
        )
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all'
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
}

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList))

export default VisibleTodoList

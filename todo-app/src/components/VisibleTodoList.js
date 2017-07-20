import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers/reducers'
import { fetchTodos } from '../api'
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
        const { filter, receiveTodos } = this.props
        fetchTodos(this.props.filter).then(todos =>
            receiveTodos(filter, todos)
        )
    }

    render() {
        const { toggleTodo, ...rest } = this.props
        return (
            <TodoList
                {...rest}
                onTodoClick={toggleTodo}
            />
        )
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all'
    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
}

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList))

export default VisibleTodoList

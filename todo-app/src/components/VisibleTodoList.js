import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers/reducers'
import { fetchTodos } from '../api'

class VisibleTodoList extends React.Component {
    componentDidMount() {
        fetchTodos(this.props.filter).then(todos =>
            console.log(this.props.filter, todos)
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            fetchTodos(this.props.filter).then(todos =>
                console.log(this.props.filter, todos)
            )
        }
    }

    render() {
        return <TodoList {...this.props} />
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all'
    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
}

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch({
            type: 'TOGGLE_TODO',
            id
        })
    }
})

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(VisibleTodoList))

export default VisibleTodoList

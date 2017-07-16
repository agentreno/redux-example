import Link from './Link'
import { connect } from 'react-redux'

// Actions
const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

// FilterLink container component adds behaviour and injects state into the
// presentational Link component
const mapStateToProps = (
    state,
    ownProps
) => ({
    active:
        ownProps.filter ===
        state.visibilityFilter
})

const mapDispatchToProps = (
    dispatch,
    ownProps
) => ({
    onClick() {
        dispatch(
            setVisibilityFilter(ownProps.filter)
        )
    }
})

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink

import React from 'react'

// Purely presentational component to show a link which is not clickable when
// active, otherwise it is a link that calls its onClick prop
const Link = ({
    active,
    onClick,
    children
}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href="#"
           onClick={e => {
               e.preventDefault()
               onClick()
           }}
        >
            {children}
        </a>
    )
}

export default Link

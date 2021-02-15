import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

const PrivatRoute = ({component: Component, ...rest}) => {
    debugger
    const {isAuth, loadind} = useSelector(state => state.auth)
    return (
        <Route {...rest} render={props => !isAuth && !loadind ?
            <Redirect to='login' />
            :
            <Component {...props} />
        } />
    )
}

export default PrivatRoute

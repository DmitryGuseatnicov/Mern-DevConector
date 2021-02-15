import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAC } from '../../redusers/authReduser'
import { clearProfileAC } from '../../redusers/profileReduser'

const NavBar = () => {
    
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.auth.isAuth)
    
    const logOut = () =>{
        dispatch(clearProfileAC())
        dispatch(logOutAC())
    }

    return (
        <nav className='navbar bg-dark'>
        <h1>
            <NavLink to='/'><i className='fas fa-code'></i> DevConnector</NavLink>
        </h1>
        <ul>
            <li><NavLink to='/posts'>Посты</NavLink></li>
            <li><NavLink to='/profiles'>Разработчики</NavLink></li>
            {!isAuth && <li><NavLink to='/register'>Регистрация</NavLink></li>}
            {!isAuth && <li><NavLink to='/login'>Логин</NavLink></li>} 
            {isAuth && <li><NavLink to='/dashboard'>Профиль</NavLink></li>}
            {isAuth && <li><NavLink onClick={()=> logOut()} to='/'>Выход</NavLink></li>}
        </ul>
    </nav> 
    )
}

export default NavBar

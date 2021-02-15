import React from 'react'
import { NavLink } from 'react-router-dom'

const DashBoardAсtion = () => {
    return (
        <div className='dash-buttons'>
            <NavLink to='/edit-profile' className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i> Редоктировать Профиль
            </NavLink>
            <NavLink to='/add-experience' className='btn btn-light'>
            <i className='fab fa-black-tie text-primary'></i> Опыт Рабобы
            </NavLink>
            <NavLink to='/add-education' className='btn btn-light'>
            <i className='fas fa-graduation-cap text-primary'></i> Образование
            </NavLink>
        </div>  
    )
}

export default DashBoardAсtion

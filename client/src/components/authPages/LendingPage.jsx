import React from 'react'
import { NavLink } from 'react-router-dom'

const LendingPage = () => {
    return (
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>DevConnector</h1>
            <p className='lead'>
            Создай профиль разработчика, делитесь сообщениями и получайте помощь от других разработчиков
            </p>
            <div className='buttons'>
              <NavLink to='/register' className='btn btn-primary'>Регистрация</NavLink>
              <NavLink to='/login' className='btn btn-light'>Войти</NavLink>
            </div>
          </div>
        </div>
      </section>            
    )
}

export default LendingPage

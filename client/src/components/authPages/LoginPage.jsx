import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { login } from './../../actions/auth'

const LoginPage = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const {email, password } = formData
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className='container'>
            <h1 className='large text-primary'>Войти</h1>
            <p className='lead'><i className='fas fa-user'></i> Войдите в свой аккаунт</p>
            <form className='form' action='dashboard.html' onSubmit={(e)=>onSubmit(e)} >

                <div className='form-group'>
                    <input value={email} onChange={(e)=>onChange(e)}
                    type='email' placeholder='Email' name='email' required />
                </div>

                <div className='form-group'>
                    <input value={password} onChange={(e)=>onChange(e)}
                    type='password' placeholder='Пароль' name='password' />
                </div>

                <input type='submit' className='btn btn-primary' value='Войти' />
                
            </form>
            <p className='my-1'>
                Нет учетной записи? <NavLink to='/register'> Зарегистрироваться</NavLink>
            </p>
        </div>
    )
}

export default LoginPage

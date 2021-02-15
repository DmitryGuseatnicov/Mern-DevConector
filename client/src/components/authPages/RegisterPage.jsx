import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import  toggleAlert  from './../../actions/alert'
import { register } from './../../actions/auth'

const RegisterPage = () => {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = formData

    const onChange = (e)=> setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e)=>{
        e.preventDefault()
        if(password !== password2){
          dispatch(toggleAlert('Пароли не совпадают', 'danger'))
        }else{
          dispatch(register(name, email, password))
        }
    }

    return (
        <div className='container'>
          <h1 className='large text-primary'>Регистрация</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Создать профиль
          </p>

          <form onSubmit={(e) => onSubmit(e)}
          className='form' action='create-profile.html'>
          
            <div className='form-group'>
              <input value={name} onChange={(e)=> onChange(e)}
              type='text' placeholder='Имя' name='name' required />
            </div>

            <div className='form-group'>
              <input value={email} onChange={(e)=> onChange(e)}
              type='email' placeholder='Email' name='email' />
              <small className='form-text'>
              Этот сайт использует Gravatar, поэтому, если вы хотите изображение профиля, используйте электронную почту Gravatar
              </small>
            </div>

            <div className='form-group'>
              <input value={password} onChange={(e)=> onChange(e)}
              type='password' placeholder='Пароль' name='password' minLength='6'/>
            </div>
            
            <div className='form-group'>
              <input value={password2} onChange={(e)=> onChange(e)}
              type='password' placeholder='Повторите пароль' name='password2' minLength='6'
              />
            </div>

            <input type='submit' className='btn btn-primary' value='Регистрация' />

          </form>
          <p className='my-1'>
            Уже есть аккаунт?<NavLink to='/login'> Войти</NavLink>
          </p>
        </div>
    )
}

export default RegisterPage

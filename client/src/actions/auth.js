import { authErrAC, loginSuccesAC, registerSuccessAC, userLoadAC } from '../redusers/authReduser'
import toggleAlert from './alert'
import axios from 'axios'
import setAuthToken from './actionUtil/setAuthToken'


export const userLoad = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth')
        dispatch(userLoadAC(res.data))
        
    } catch (error) {
        dispatch(authErrAC())
    }
}

export const login = (email, password) => async dispatch =>{
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {email, password})
        console.log(res.data)
        dispatch(loginSuccesAC(res.data))
        dispatch(userLoad())
    } catch (error) {
        if(Array.isArray(error.response.data.errors)){
            dispatch(toggleAlert(error.response.data.errors.map(err => err.msg),'danger'))
        }else {
            dispatch(toggleAlert(error.response.data.msg, 'danger'))
        }
    }
}

export const register = (name, email, password) => async dispatch =>{
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register',{name, email, password})
        dispatch(registerSuccessAC(res.data))
        dispatch(userLoad())
        dispatch(toggleAlert('Пользователь был успешно загеристрирован', 'danger'))
    } catch (error) {
        if(Array.isArray(error.response.data.errors)){
            dispatch(toggleAlert(error.response.data.errors.map(err => err.msg),'danger'))
        }else {
            dispatch(toggleAlert(error.response.data.msg, 'danger'))
        }
    }
}
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const USER_LOAD = 'USER_LOAD'
const AUTH_ERR = 'AUTH_ERR'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOG_OUT = 'LOG_OUT'
const ACCOUNT_DELETED = 'ACCOUNT_DELETED'


const initialState ={
    token: localStorage.getItem('token'),
    isAuth: null,
    loading: true,
    user: null
}

const authReduser = (state = initialState, action) =>{
    switch(action.type){

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:{
            localStorage.setItem('token', action.payload.token)
           return {...state, ...action.payload , isAuth: true,loading: false}
        }
        
        case LOG_OUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case ACCOUNT_DELETED:
        case AUTH_ERR:{
            localStorage.removeItem('token')
            return {...state, token: null, isAuth: false, user: null,loading: false}
        } 
        case USER_LOAD: return {...state, user:{...action.payload}, isAuth: true, loading: false}


        default:
            return state
    }
}

export default authReduser

export const registerSuccessAC = (res) => ({type:REGISTER_SUCCESS, payload:{...res}})
export const registerFailAC = () => ({type:REGISTER_FAIL})
export const userLoadAC = (token) => ({type:USER_LOAD, payload:token})
export const authErrAC = () => ({type:AUTH_ERR})
export const loginSuccesAC = (res) =>({type:LOGIN_SUCCESS, payload:{...res}})
export const loginFailAC = () => ({type:LOGIN_FAIL})
export const logOutAC = () => ({type:LOG_OUT})
export const accountDeletedAC =() => ({type:ACCOUNT_DELETED})
import axios from 'axios'
import toggleAlert from './alert'
import { getProfileAC, profileErrAC, clearProfileAC, updateProfileAC, getAllprofilesAC } from './../redusers/profileReduser'
import { accountDeletedAC } from './../redusers/authReduser'



export const getProfile = () => async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me')
        dispatch(getProfileAC(res.data))
    } catch (error) {
        
        dispatch(profileErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const getAllProfiles = () => async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/api/profile')
        dispatch(getAllprofilesAC(res.data))
    } catch (error) {
        dispatch(profileErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const getProfileById = (id) => async dispatch =>{
    dispatch(clearProfileAC())
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${id}`)
        dispatch(getProfileAC(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const deleteProfile = () => async dispatch =>{
    try {
        const res = await axios.delete('http://localhost:5000/api/profile')
        dispatch(clearProfileAC())
        dispatch(accountDeletedAC())
        
    } catch (error) {
        dispatch(profileErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch =>{
    try {
        const res = await axios.post('http://localhost:5000/api/profile', formData)
        dispatch(getProfileAC(res.data))
        dispatch(toggleAlert(edit ? 'Профиль был отредактирован' : 'Профиль был создан', 'success'))
        history.push('/dashboard')

    } catch (error) {
        dispatch(profileErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const addExperience= (formData, history) => async dispatch =>{
    try {
        const res = await axios.put('http://localhost:5000/api/profile/experience', formData)
        dispatch(updateProfileAC(res.data))
        dispatch(toggleAlert("expireise added", 'success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(toggleAlert(error.msg, 'danger')))
        }
    }
}

export const addEducation = (formData, history) => async dispatch =>{
     try {
          const res = await axios.put('http://localhost:5000/api/profile/education', formData)
          dispatch(updateProfileAC(res.data))
          dispatch(toggleAlert("education added", 'success'))
          history.push('/dashboard')
      } catch (err) {
          const errors = err.response.data.errors
          if(errors){
              errors.forEach(error => dispatch(toggleAlert(error.msg, 'danger')))
          }
      }
}

export const deleteExperience = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)
        dispatch(updateProfileAC(res.data))
        dispatch(toggleAlert('experience wass delete', 'success'))
    } catch (errors) {
        errors.forEach(error => dispatch(toggleAlert(error.msg, 'danger')))
    }
}

export const deleteEducation = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)
        dispatch(updateProfileAC(res.data))
        dispatch(toggleAlert('education vass deleted', 'success'))
    } catch (errors) {
        errors.forEach(error => dispatch(toggleAlert(error.msg, 'danger')))
    }
}
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, NavLink, Link } from 'react-router-dom'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'
import ProfileTop from './ProfileTop'
import ProfileInfo from './ProfileInfo'
import Loader from './../../Utilits/Loader'
import { getProfileById } from './../../../actions/profile'

const Profile = ({match}) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const {profile, loading} = useSelector(state => state.profileData)
    
    const expList = (exp) =>{
        if(exp.length == 0){
            return <h4>Опыт работы не указан</h4>
        }
        const experienceList = exp.map(exp => <ProfileExperience key={exp._id} experience={exp}/>)
        return  experienceList
    }
    const eduList = (edu) =>{
        if(edu.length === 0){
            return <h4>Ифнормация об Образование не указана</h4>
        }
        const educationList = edu.map(edu => <ProfileEducation key={edu._id} education={edu}/>)
        return  educationList
    }
   
    useEffect(()=>{
        dispatch(getProfileById(match.params.id))
    },[])

    return (
        <div className='container'>
            {
            profile === null || loading ?
            <Loader /> :
            <div>
                <NavLink className='btn btn-primery' to='/profiles'>Назад</NavLink>
                {
                auth.isAuth && auth.loading === false && auth.user._id === 
                profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Редактировать профиль</Link>)
                }
                <div className='profile-grid my-1'>
                <ProfileTop profile={profile} />
                <ProfileInfo profile={profile} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Опыт работы</h2>
                    {expList(profile.experience)}
                </div>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Образование</h2>
                    {eduList(profile.education)}
                </div>
                
            </div>
            </div>
            }
            
        </div>
    )
}



export default withRouter(Profile)
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from './ProfileCard'
import Loader from './../Utilits/Loader'
import {getAllProfiles} from './../../actions/profile'

const Profiles = () => {
    const dispatch = useDispatch()
    const {profiles, loading} = useSelector(state => state.profileData)
    const profileList = profiles.map(profile => <ProfileCard key={profile._id} profile={profile}/>)
    useEffect(()=>{
        dispatch(getAllProfiles())
    },[])
    return (
        <div className='container'>
            {
            loading ?  <Loader/> :
            <>
            <h1 className='large text-primary'>Разработчики</h1>
            <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Профили разработчиков
            </p>
            <div className='profiles'>
                {profileList.length > 0 ? <div>{profileList}</div> : <h4>Не найдено не одного профиля</h4>}
            </div>
            </>
            }
        </div>
    )
}

export default Profiles

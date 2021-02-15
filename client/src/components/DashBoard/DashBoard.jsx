import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Loader from './../Utilits/Loader'
import { getProfile } from './../../actions/profile'
import DashBoardAction from './DashBoardAсtion'
import Experience from './Experience'
import Education from './Education'
import { deleteProfile } from './../../actions/profile'

const DashBoard = () => {
    const dispatch = useDispatch()

    const { profile,loading  } = useSelector(state => state.profileData)
    const user = useSelector(state => state.auth.user)

    useEffect(()=>{
        dispatch(getProfile())
    },[])
    
    if(loading && profile == null){
        return <Loader/>
    }
    return (
        <div className='container'>
        <h1 className='lagre text-primary'>Настройки</h1>
        <p className='lead'>{user && user.name}</p>
            {profile ==null ?
            <>
                <p>О вас нету ни какой информации , создайте профиль</p>
                <NavLink to='/craete-profile' className='btn btn-primary m-1'>
                создать профиль
                </NavLink>
            </> 
            :
            <>  
                <DashBoardAction />
                <Experience />
                <Education />
                <div className='my-2'>
                    <button on onClick={()=> dispatch(deleteProfile())}
                    className='btn btn-danger'>Удалить мой профиль</button>
                </div>
            </>
            }    
        </div>
    )
}

export default DashBoard

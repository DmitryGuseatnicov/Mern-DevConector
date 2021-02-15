import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileCard = (props) => {
    
    const {user, status, company, location, skills } = props.profile
    const { _id, name , avatar} = user

    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img'/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>в {company}</span>}</p>
                <p className='my-1'> {location && <span> {location}</span>}</p>
                <NavLink className='btn btn-primary' to={`profile/user/${_id}`}>Посмотреть профиль</NavLink>
            </div>
            <ul>
                {skills.slice(0, skills.length).map((skill, index)=> 
                <li key={index} className='text-primary'>
                <i className='fas fa-check'></i> {skill}
                </li>)}
            </ul>
        </div>
    )
}

export default ProfileCard

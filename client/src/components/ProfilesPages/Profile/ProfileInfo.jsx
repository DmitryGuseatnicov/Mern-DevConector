import React from 'react'

export const ProfileInfo = (props) => {

    const { bio, skills, user } = props.profile
    const skilsList = skills.map ((skill , index)=>  <div key={index} className='p-1'><i className='fa fa-check'></i> {skill}</div> )
    return (
        <div className='profile-about bg-light p-2'>
            {bio && 
            <>
                <h2 className='text-primary'>{user.name} о себе</h2>
                <p>{bio}</p>
                <div className='line'></div>
            </>
            }
            <h2 className='text-primary'>Знания</h2>
            <div className='skills'>
            {skilsList}
            </div>
        </div>
    )
}

export default ProfileInfo
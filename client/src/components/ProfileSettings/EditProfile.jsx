import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { createProfile, getProfile } from '../../actions/profile'

const EditProfile = ({history}) => {

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',   
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',    
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const [socilaItputs, toggleSocialInputs] = useState(false)
    const {company, website, location, status, skills,
        githubusername, bio, twitter, facebook, linkedin, youtube, instagram} = formData

    const {profile, loading} = useSelector(state => state.profileData)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProfile())
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        })
    },[loading])

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = (e) =>{
      e.preventDefault()
      dispatch(createProfile(formData, history, true))
    }

    return (
      <div className='container'>
        <h1 className='large text-primary'>
        Create Your Profile
        </h1>
        <p className='lead'>
        <i className='fas fa-user'></i> Укажите немного информации о себе что выш профиль мог быть видем
        </p>
        <small>* = поля обезательные к заполнению</small>
        <form className='form' onSubmit={(e)=>onSubmit(e)}>

          <div className='form-group'>
            <select name='status' onChange={(e) => onChange(e)}>
              <option value='0'>* Укажите вашу должность</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'></small>
          </div>

          <div className='form-group'>
            <input value={company} onChange={(e)=>onChange(e)} type='text' placeholder='Company' name='company' />
            <small className='form-text'>Кем вы на данные момент работаете</small>
          </div>

          <div className='form-group'>
            <input value={website} onChange={(e)=>onChange(e)} type='text' placeholder='Website' name='website' />
            <small className='form-text'>Укажите ваш сайт или сайт компании где работаете</small>
          </div>

          <div className='form-group'>
            <input value={location} onChange={(e)=>onChange(e)} type='text' placeholder='Location' name='location' />
            <small className='form-text'>Город</small>
          </div>

          <div className='form-group'>
            <input value={skills} onChange={(e)=>onChange(e)} type='text' placeholder='* Skills' name='skills' />
            <small className='form-text'>укажите технологии с которыми работатет через запятую</small>
          </div>

          <div className='form-group'>
            <input value={githubusername} onChange={(e)=>onChange(e)}
              type='text' placeholder='Github Username' name='githubusername'/>
            <small className='form-text'>Укажите ссылку на ваш профить в GitHub</small>
          </div>

          <div className='form-group'>
            <textarea value={bio} onChange={(e)=>onChange(e)} placeholder='Bio' name='bio'></textarea>
            <small className='form-text'>Расскажите немного о себе</small>
          </div>

        <div className='my-2'>
          <button onClick={()=> toggleSocialInputs(!socilaItputs)} type='button' className='btn btn-light'>
            Укажите ссылки на соц. сети
          </button>
        </div>
        
        {socilaItputs && 
        <>
        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input value={twitter} onChange={(e)=>onChange(e)} type='text' placeholder='Twitter URL' name='twitter' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input value={facebook} onChange={(e)=>onChange(e)} type='text' placeholder='Facebook URL' name='facebook' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input value={youtube} onChange={(e)=>onChange(e)} type='text' placeholder='YouTube URL' name='youtube' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-linkedin fa-2x'></i>
          <input value={linkedin} onChange={(e)=>onChange(e)} type='text' placeholder='Linkedin URL' name='linkedin' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input value={instagram} onChange={(e)=>onChange(e)} type='text' placeholder='Instagram URL' name='instagram' />
        </div>
        </>
        }
        
        <input type='submit' className='btn btn-primary my-1' value='Сохранить'/>
        <NavLink className='btn btn-light my-1' to='/dashboard'>Назад</NavLink>
      </form>
    </div>
    )
}

export default withRouter(EditProfile)

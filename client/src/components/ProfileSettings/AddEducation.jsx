import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { addEducation } from "../../actions/profile";

export const AddEducation  = ({history}) => {

  const dispatch = useDispatch()

  const [formData, setFormData ] = useState({
    school: '',
    degree: '', 
    fieldofstudy: '', 
    from: '', 
    to: '', 
    current: false, 
    description: ''
  })
  const [toDataDisable, toggleDesable] = useState(false)

  const {school, degree, fieldofstudy, from, to, current, description} = formData

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    
  const onSubmit = (e) =>{
    debugger
    e.preventDefault()
    dispatch(addEducation(formData, history))
  }

  return (
    <div className='container'>
      <h1 className="large text-primary">Образование</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Укажите информацию о том где учились Школа/Университет/Курсы
      </p>
      <small>* = поля обезательные к заполнению</small>
      <form className="form" onSubmit={(e)=> onSubmit(e)}>

        <div className="form-group">
          <input value={school} onChange={(e)=> onChange(e)}
            type="text" placeholder="* Школа/Университет/Курсы " name="school" required/>
        </div>

        <div className="form-group">
          <input value={degree} onChange={(e)=> onChange(e)}
            type="text" placeholder="* Диплом или Сертификат" name="degree" required/>
        </div>

        <div className="form-group">
          <input value={fieldofstudy} onChange={(e)=> onChange(e)} 
          type="text" placeholder="Спецальность" name="fieldofstudy" />
        </div>

        <div className="form-group">
          <h4>С</h4>
          <input value={from} onChange={(e)=> onChange(e)}
          type="date" name="from"/>
        </div>

        <div className="form-group">
          <p>
            <input value={current} checked={current} onChange={(e)=> {
              setFormData({...formData, current: !current})
              toggleDesable(!toDataDisable)
            }}
            checked={toDataDisable} type="checkbox" name="current"/> 
            Текущее место учебы
          </p>
        </div>

        <div className="form-group">
          <h4>По</h4>
          <input value={to} onChange={(e)=> onChange(e)} 
          disabled={toDataDisable} type="date" name="to" />
        </div>

        <div className="form-group">
          <textarea value={description} onChange={(e)=> onChange(e)}
            name="description" cols="30" rows="5" placeholder="Расскажи немного о там чему вы учились">
          </textarea>
        </div>
        
        <input type="submit" className="btn btn-primary my-1" value="Сохранить" />
        <NavLink className="btn btn-light my-1" to="/dashboard">
          Назад
        </NavLink>
      </form>
    </div>
  );
};

export default withRouter(AddEducation) 
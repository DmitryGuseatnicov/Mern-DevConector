import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addExperience } from '../../actions/profile'

export const AddExpirience = ({history}) => {

    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        tittle: '', 
        company: '', 
        location: '', 
        from: '', 
        to: '', 
        current: false, 
        description: ''
    })
    
    const {tittle, company, location, from, to, current, description}  = formData
    const [dateToDesable, toggleDesable] = useState(false)

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(addExperience(formData, history)) 
    }
    
    return (
        <div className='container'>
            <h1 className='large text-primary'>
            Добавить Место Работы
            </h1>
            <p className='lead'>
                <i className='fas fa-code-branch'></i> Укажите немного информации о то где вы работали раньше
            </p>
            <small>* = поля обезательные к заполнению</small>
            <form className='form' onSubmit={(e) => onSubmit(e)}>

            <div className='form-group'>
                <input value={tittle} onChange={(e) => onChange(e)}
                 type='text' placeholder='* Должность' name='tittle' required />
            </div>

            <div className='form-group'>
                <input value={company} onChange={(e) => onChange(e)}
                 type='text' placeholder='* Место работы' name='company' required />
            </div>

            <div className='form-group'>
                <input value={location} onChange={(e) => onChange(e)}
                 type='text' placeholder='Город' name='location' />
            </div>

            <div className='form-group'>
            <h4>С</h4>
                <input value={from} onChange={(e) => onChange(e)}
                 type='date' name='from' />
            </div>

            <div className='form-group'>
                <p>
                    <input value={current} checked={current} onChange={(e) => {
                    setFormData({...formData, current: !current})
                    toggleDesable(!dateToDesable)
                    }}
                    type='checkbox' name='current' /> 
                    Текущее место работы
                </p>
            </div>

            <div className='form-group'>
            <h4>По</h4>
                <input value={to} onChange={(e) => onChange(e)}
                 type='date' name='to' disabled={dateToDesable} />
            </div>

            <div className='form-group'>
                <textarea value={description} onChange={(e) => onChange(e)}
                name='description' cols='30' rows='5' placeholder='Опищите чем вы занималить на данном месте'>
                </textarea>
            </div>

            <input type='submit' className='btn btn-primary my-1' value='Сохранить'/>
            <a className='btn btn-light my-1' href='dashboard.html'>Назад</a>
        </form>
    </div>
    )
}

export default withRouter(AddExpirience)

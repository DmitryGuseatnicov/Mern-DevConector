import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'

const Experience = () => {
    const dispatch = useDispatch()
    const expirience  = useSelector(state=> state.profileData.profile.experience).map(exp => 
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.tittle}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
                {exp.to === null ? 'В данный момент' : <Moment format='YYYY/MM/DD'>{exp.from}</Moment>}
            </td>
            <td>
                <button on onClick={()=> dispatch(deleteExperience(exp._id))}
                 className='btn btn-danger'>Удалить</button>
            </td>
        </tr>
        )
    return (
        <>
            <h2 className='my-2'>Опыт Работы</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Место работы</th>
                        <th className='hide-sm'>Должность</th>
                        <th className='hide-sm'>Период</th>
                        <th/>
                    </tr> 
                </thead>
                <tbody>{expirience}</tbody>
            </table>
        </>
    )
}

export default Experience

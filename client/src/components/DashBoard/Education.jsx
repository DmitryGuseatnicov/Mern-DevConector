import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'

const Education = () => {

    const dispatch = useDispatch()
    
    const education  = useSelector(state=> state.profileData.profile.education).map(edu => 
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {' '}
                {edu.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
            </td>
            <td><button onClick={()=> dispatch(deleteEducation(edu._id))}
                className='btn btn-danger'>Удалить</button>
            </td>
        </tr>
        )
    return (
        <>
            <h2 className='my-2'>Образование</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Университет/Школа/Курсы</th>
                        <th className='hide-sm'>Диплом/Сертификат</th>
                        <th className='hide-sm'>Период</th>
                        <th />
                    </tr> 
                </thead>
                <tbody>{education}</tbody>
            </table>
        </>
    )
}

export default Education

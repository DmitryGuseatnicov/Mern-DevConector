import React from 'react'
import Moment from 'react-moment'

export const ProfileExperience = (props) => {

    const {company,tittle , to, from, description } = props.experience
    return (
        <>
        <div>
          <h3 className='text-dark'>{company}</h3>
          <p>
              <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
              {!to ? 'Сегодня': <Moment format='YYYY/MM/DD'>{to}</Moment>}
          </p>
          <p><strong>Должность: </strong>{tittle}</p>
          <p>
            <strong>Описание: </strong>{description}
          </p>
        </div>
      </>
    )
}

export default ProfileExperience
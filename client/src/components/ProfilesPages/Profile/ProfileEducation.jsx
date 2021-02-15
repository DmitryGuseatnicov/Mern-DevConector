import React from 'react'
import Moment from 'react-moment'

export const ProfileEducation = (props) => {

    const {school, degree ,fieldofstudy , to, from, description } = props.education
    return (
        <>
        <div>
          <h3 className="text-dark">{school}</h3>
          <p>
          <Moment format='YYYY/DD/MM'>{from}</Moment>-{' '}
          {!to ? 'Сегодня' : <Moment format='YYYY/DD/MM'>{to}</Moment>}
          </p>
          <p>
            <strong>Диплом:</strong>{degree}
          </p>
          <p>
            <strong>Спецальность:</strong>{fieldofstudy}
          </p>
          <p>
            <strong>Описание: </strong>{description}
          </p>
      </div>
      </>
    )
}

export default ProfileEducation
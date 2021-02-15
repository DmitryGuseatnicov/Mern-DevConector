import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alerts = useSelector(state => state.alert)

    return (
        <div >
            {
            alerts ? alerts.map((item) => <div key={item.id} className={`alert alert-${item.alertType}`}>{item.msg}</div> ):
            <div></div>
            }
        </div>
    )
}

export default Alert

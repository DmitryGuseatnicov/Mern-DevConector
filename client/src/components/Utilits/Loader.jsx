import React from 'react'
import loader from './../../img/loader.gif'

export const Loader = () => {
    return (
        <>
            <img
            src={loader}
            style={{width :'200px', margin: 'auto', display: 'block'}}
            alt='loading'
            />
        </>
    )
}
export default Loader


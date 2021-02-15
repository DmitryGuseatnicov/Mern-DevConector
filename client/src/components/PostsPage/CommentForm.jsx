import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = (props) => {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const [text, setText] = useState('')
    const postId = props.postId

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(addComment(postId, {text}))
        setText('')
    }

    return (
        <>
        {isAuth &&
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Комментарий</h3>
            </div>
            <form className='form my-1' onSubmit={(e) => onSubmit(e)}>

                <textarea onChange={ (e) => setText(e.target.value)}
                name='text' cols='30' rows='5' required value={text}>
                </textarea>
                
                <input type='submit' className='btn btn-dark my-1' value='отправить' />
            </form>
        </div>}
        </>
    )
}

export default CommentForm

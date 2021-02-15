import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = (props) => {

    const dispatch = useDispatch()

    const isAuth = props.auth.isAuth
    const [text, setText] = useState('')

    const onSubmit = (e) =>{
      e.preventDefault()
      dispatch(addPost({text}))
      setText('')
    }
    
    if(!isAuth){
        return(
            <div></div>
        )
    }

    return (
        <div className='post-form'>
          <div className='bg-primary p'>
            <h3>Создайте пост</h3>
          </div>
          <form className='form my-1' onSubmit={(e) =>onSubmit(e) }>

          <textarea onChange={(e) => setText(e.target.value)}
          name='text' cols='30' rows='5' required value={text}>
          </textarea>

          <input type='submit' className='btn btn-dark my-1' value='отправить' />
        </form>
      </div>
    )
}

export default PostForm
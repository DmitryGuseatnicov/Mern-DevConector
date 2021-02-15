import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { deletePost, likePost, unlikePost } from '../../actions/post'


const PostItem = (props) => {
  
    const dispatch = useDispatch()

    const auth = props.auth
    const showActions = props.showActions
    const {_id, text, name, avatar, user, likes, comments, date} = props.post 
    return ( 
        <div className='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/user/${user}`}>
              <img className='round-img' src={avatar} alt='' />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className='my-1'>
            {text}
            </p>
            <p className='post-date'>
                <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && <>
            {auth.isAuth && <>

            <button onClick={() => dispatch(likePost(_id))}
              type='button' className='btn btn-light'>
              <i className='fas fa-thumbs-up'></i>{' '}
              <span>{likes.length}</span>
            </button>

            <button onClick={() =>dispatch(unlikePost(_id))}
              type='button' className='btn btn-light'>
              <i className='fas fa-thumbs-down'></i>
            </button>
          </>}

            <NavLink to={`/posts/${_id}`} className='btn btn-primary'>
              Комментарии {comments.length > 0 && <span className='comment-count'>{comments.length}</span>} 
            </NavLink>
            {auth.user !==null && !auth.loading && user._id === auth.user.id &&
            <button onClick={() =>{dispatch(deletePost(_id))}}
              type='button' className='btn btn-danger'>
              <i className='fas fa-times'></i>
            </button>}

          </>}
          </div>
      </div> 
    )
}
export default PostItem
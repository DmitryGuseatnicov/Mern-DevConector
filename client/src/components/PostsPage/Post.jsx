    import React, { useEffect } from 'react'
    import {useDispatch, useSelector} from 'react-redux'
    import { getPost } from '../../actions/post'
    import {Link, withRouter} from 'react-router-dom'
    import PostItem from './PostItem'
    import Loader from './../Utilits/Loader'
    import CommentForm from './CommentForm'
    import CommentItem from './CommentItem'


    const Post = ({match}) => {

        const dispatch = useDispatch()

        const showAction = false
        const post = useSelector(state => state.postData.post)

        const showComments = (post) =>{
            debugger
            if(!post){
                return <div></div>
            }
            const commentList = post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id}/>)
            return commentList
        }

        useEffect(()=>{
            dispatch(getPost(match.params.id))
        },[])

        return (
            <div className='container'>
                {
                !post ? <Loader /> :
                <>
                <Link to='/posts' className='btn'>Назад</Link>
                <PostItem showAction={showAction} post={post} />
                <CommentForm postId={post._id}/>
                <div className='comments'>
                {showComments(post)}
                </div>
                </>
                }
            </div>
        ) 
    }

    export default withRouter(Post)
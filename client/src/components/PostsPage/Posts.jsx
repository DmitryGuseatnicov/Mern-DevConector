import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './../../actions/post'
import Loader from './../Utilits/Loader'
import PostForm from './PostForm'
import PostItem from './PostItem'


export const Posts = () => {
    
    const dispatch = useDispatch()

    const showActions = true
    const {posts, loading} = useSelector(state => state.postData)
    const auth = useSelector(state => state.auth)
    const postsList = posts.map((post) => <PostItem key={post._id} showActions={showActions} post={post} auth={auth}/>)
    
    const seyTime = () =>{
        let time = new Date().getHours()
        if(time > 0 && time <= 18){
            return 'День'
        }
        return 'Вечер'
    }
    
    useEffect(()=>{
        dispatch(getPosts())
    },[])

    return (    
        <div className='container'>{
        loading ? <Loader/>:
        <>
            <h1 className='large text-primary'></h1>
            <p className='lead'>
                <i className='fas fa-user'> Добрый {seyTime()} </i>
            </p>
            <PostForm  auth={auth}/>
            <div className='posts'>
               <div>{postsList}</div>
            </div>
        </>
        }
        </div>
    )
}

export default Posts
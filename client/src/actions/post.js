import axios from 'axios'
import { addPostAC, deletePostAC, getPostsAC, postErrAC, updatePostAC, getPostAC, deleteCommentAC, addCommentAC } from './../redusers/postReduser'
import toggleAlert from './alert'

export const getPosts = () => async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/api/posts')
        dispatch(getPostsAC(res.data))
    } catch (error) {
        console.log(error.response)
       dispatch(postErrAC())
    }
}

export const likePost = (id) => async dispatch =>{
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`)
        console.log(res.data)
        dispatch(updatePostAC(id, res.data))
    } catch (error) {
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const unlikePost = (id) => async dispatch =>{
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`)
        dispatch(updatePostAC(id, res.data))
    } catch (error) {
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const deletePost = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/${id}`)
        dispatch(deletePostAC(id))
        dispatch(toggleAlert('Пост был удален', 'danger'))
    } catch (error) {
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const addPost = (formData) => async dispatch =>{
    try {
        const res = await axios.post(`http://localhost:5000/api/posts`,formData)
        dispatch(addPostAC(res.data))
        dispatch(toggleAlert('пост был добавлен', 'success'))
    } catch (error) {
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const getPost = (id) => async dispatch =>{
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
        debugger
        dispatch(getPostAC(res.data))
    } catch (error) {
        console.log(error)
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const addComment = (postId, formData) => async dispatch =>{
    try {
        const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData)
        dispatch(addCommentAC(res.data))
        dispatch(toggleAlert('Коментраий был добавлен', 'success'))
    } catch (error) {
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    }
}

export const deleteComment = (commentId, postId) => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
        dispatch(deleteCommentAC(commentId))
        dispatch(toggleAlert('Коментарий был удален', 'success'))
    } catch (error) {
        dispatch(postErrAC({msg: error.response.statusText, status: error.response.status}))
    } 
}
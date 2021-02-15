const GET_POSTS = 'GET_POSTS'
const POST_ERROR = 'POST_ERROR'
const UPDATE_LIKES = 'UPDATE_LIKES'
const DELETE_POST = 'DELETE_POST'
const ADD_POST = 'ADD_POST'
const GET_POST = 'GET_POST'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

const initialState ={
    posts: [],
    post: null,
    loading: true,
    error: {}
}

const postReduser = (state = initialState, action) =>{
    
    switch(action.type){

        case GET_POSTS: return {...state,loading: false ,posts: action.payload}
        case GET_POST: return {...state, loading: false, post: action.payload}

        case ADD_COMMENT: return {...state, loading: false, post:{...state.post, comments: action.payload}}
        case ADD_POST: return {...state, loading: false, posts:[ action.payload, ...state.posts]}

        case UPDATE_LIKES: return {...state, loading: false, posts: state.posts.map(post =>
            post._id == action.payload.id ? {...post, likes: action.payload.likes} : post)}
            
        case DELETE_POST: return {...state, loading: false, posts: state.posts.filter(post =>
            post._id !== action.payload)}
        case DELETE_COMMENT: return {...state,loading: false, post:{...state.post, comments: state.post.comments.filter(
            comment => comment._id !== action.payload
        )}}
        
        case POST_ERROR: return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export default postReduser

export const getPostsAC = (posts) => ({type:GET_POSTS, payload: posts})
export const getPostAC = (post) => ({type: GET_POST, payload: post})
export const postErrAC = (error) => ({type:POST_ERROR, payload:error})
export const updatePostAC = (id, likes) => ({type:UPDATE_LIKES, payload:{id, likes}})
export const deletePostAC = (id) => ({type:DELETE_POST, payload: id})
export const addPostAC = (post) => ({type: ADD_POST, payload: post})    
export const addCommentAC = (comment) => ({type:ADD_COMMENT, payload: comment})
export const deleteCommentAC = (commentId) => ({type:DELETE_COMMENT, payload: commentId})
const GET_PROFILE = 'GET_PROFILE'
const PROFILE_ERR = 'PROFILE_ERR'
const CLEAR_PROFILE = 'CLEAR_PROFILE'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const GET_ALL_PROFILERS = 'GET_ALL_PROFILERS'
const GET_REPOS = 'GET_REPOS'

const initialState ={
    profile: null,
    profiles: [],
    repos : [],
    loading: true,
    errors: {}
}

const profileReduser = (state = initialState, action) =>{
  
    switch(action.type){

        case UPDATE_PROFILE:
        case GET_PROFILE: return {...state, loading: false, profile: action.payload}

        case GET_REPOS: return {...state, loading: false, repos: action.payload}

        case GET_ALL_PROFILERS: return{...state, loading: false ,profiles: action.payload}

        case PROFILE_ERR: return {...state, loading: false, errors: action.payload}

        case CLEAR_PROFILE: return {...state,profile: null, loading: false, repos: []}
        default:
            return state
    }
}

export default profileReduser

export const getProfileAC = (profile) => ({type: GET_PROFILE, payload: profile})
export const profileErrAC = (err) => ({type: PROFILE_ERR, payload: err}) 
export const clearProfileAC = () => ({type: CLEAR_PROFILE})
export const updateProfileAC = (profile) => ({type: UPDATE_PROFILE, payload: profile})
export const getAllprofilesAC = (profiles) => ({type:GET_ALL_PROFILERS, payload: profiles})
export const getReposAC = (repos) => ({type: GET_REPOS, payload: repos})
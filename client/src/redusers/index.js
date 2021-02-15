import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import alertReduser from './alertReduser'
import authReduser from './authReduser'
import profileReduser from './profileReduser'
import postReduser from './postReduser'

const rootStore = combineReducers({
    alert: alertReduser,
    auth: authReduser,
    profileData: profileReduser,
    postData: postReduser

})

export const store = createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)))
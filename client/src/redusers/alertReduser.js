const SET_ALERT = "SET_ALERT"
const REMOVE_ALERT = "REMOVE_ALERT"

const initialState =[]

const  alertReduser = (state = initialState, action) =>{
    switch(action.type){
        case SET_ALERT: { return [...state, action.payload] }
        case REMOVE_ALERT: { return state.filter(alert => alert.id !== action.payload)}
        default:
             return state
    }
}
export default alertReduser

export const setAlertAC = (msg, alertType, id) => {
    return {type:SET_ALERT, payload:{ msg, alertType, id}}
}
export const removeAlertAC = (id) => ({type:REMOVE_ALERT, payload:id})

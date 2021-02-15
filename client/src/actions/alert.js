import { v4 as uuidv4 } from 'uuid';
import {setAlertAC, removeAlertAC} from './../redusers/alertReduser'


const toggleAlert = (msg, alertType) => dispatch =>{ 
    const id = uuidv4()
    dispatch(setAlertAC(msg, alertType, id))
    setTimeout(() => dispatch(removeAlertAC(id)), 3000)
}

export default toggleAlert
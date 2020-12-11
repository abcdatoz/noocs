import {combineReducers} from 'redux'

//import errors from './errors' 
//import messages from './messages'
import auth from './auth'
import banner from './BannerReducer'
import municipio from './MunicipioReducer'
import escuela from './EscuelaReducer'
import curso from './CursoReducer'

export default combineReducers({
    auth, 
    banner,
    municipio,
    escuela,
    curso,
});
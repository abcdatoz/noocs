import {combineReducers} from 'redux'

import auth from './auth'
import banner from './BannerReducer'
import municipio from './MunicipioReducer'
import escuela from './EscuelaReducer'
import curso from './CursoReducer'
import videoactividades from './VideoActividadReducer'
import question from './QuestionReducer'
import answer from './AnswerReducer'

export default combineReducers({
    auth, 
    banner,
    municipio,
    escuela,
    curso,
    videoactividades,
    question,
    answer,
});
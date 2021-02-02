import {combineReducers} from 'redux'

import auth from './auth'
import usuarioEscuela from './UsuarioEscuelaReducer'
import banner from './BannerReducer'
import municipio from './MunicipioReducer'
import escuela from './EscuelaReducer'
import curso from './CursoReducer'
import videoactividades from './VideoActividadReducer'
import question from './QuestionReducer'
import answer from './AnswerReducer'
import miscursos from './MisCursosReducer'


export default combineReducers({
    auth, 
    usuarioEscuela,
    banner,
    municipio,
    escuela,
    curso,
    videoactividades,
    question,
    answer,
    miscursos
});
import {GET_QUESTIONS,ADD_QUESTION,EDIT_QUESTION,DELETE_QUESTION} from '../actions/QuestionActions'

const initialState = {
    lista:[]
}

export default function (state=initialState, action){
    switch (action.type){
        case GET_QUESTIONS:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_QUESTION:
            return{
                ...state,
                lista:[...state.lista, action.payload]
            }

        case EDIT_QUESTION:
            return{
                ...state,
                lista: [...state.lista.filter(x => x.id !== action.payload.id), ...action.payload]
            }

        case DELETE_QUESTION:
            return {
                ...state,
                lista: state.lista.filter(x=>x.id !== action.payload)
            }
        
        default:
            {
                return state
            }
    }
}
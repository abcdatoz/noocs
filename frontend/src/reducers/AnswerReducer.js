import { GET_ANSWERS } from '../actions/AnswerActions'


const initialState = {
    lista:[]
}

export default function (state=initialState, action){
    switch(action.type){
        case GET_ANSWERS:
            return{
                ...state,
                lista: action.payload
            }
        
        default:{ return state}
            
    }
}
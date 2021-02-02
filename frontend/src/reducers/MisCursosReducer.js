import {GET_MIS_CURSOS, ADD_MI_CURSO,DELETE_MI_CURSO} from '../actions/MisCursosActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_MIS_CURSOS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_MI_CURSO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        
            
        case DELETE_MI_CURSO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}
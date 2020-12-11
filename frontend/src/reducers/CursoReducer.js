import {GET_CURSOS, ADD_CURSO,EDIT_CURSO,DELETE_CURSO} from '../actions/CursoActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_CURSOS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_CURSO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_CURSO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_CURSO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}
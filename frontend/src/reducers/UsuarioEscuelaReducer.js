import { ADD_USUARIO_ESCUELA } from '../actions/UsuarioEscuelaActions'

const initialState = {
    lista:[]
}

export default function (state = initialState,action){
    switch(action.type){
        case ADD_USUARIO_ESCUELA:
            return{
                ...state,
                lista:[...state.lista,action.payload]
            };
        default:{
            return state;
        }
    }
}
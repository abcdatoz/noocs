import {GET_VIDEOACTIVIDADES,ADD_VIDEOACTIVIDAD,EDIT_VIDEOACTIVIDAD,DELETE_VIDEOACTIVIDAD} from '../actions/VideoActividadesActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_VIDEOACTIVIDADES:
            return{
                ...state,
                lista: action.payload
            };
        case ADD_VIDEOACTIVIDAD:
            return{
                ...state,
                lista : [...state.lista, action.payload]
            };
        case EDIT_VIDEOACTIVIDAD:
            return{
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id ), action.payload]
            };
        case DELETE_VIDEOACTIVIDAD:
            return{
                ...state,
                lista: state.lista.filter( item => item.id !== action.payload)
            };
        
        default:{
                return state;
        }
    }
}
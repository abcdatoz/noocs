import  {GET_ESCUELAS, ADD_ESCUELA, EDIT_ESCUELA, DELETE_ESCUELA}  from '../actions/EscuelaActions'


const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_ESCUELAS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_ESCUELA:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_ESCUELA:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_ESCUELA:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}
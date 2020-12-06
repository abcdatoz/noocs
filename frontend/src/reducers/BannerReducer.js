import  {GET_BANNERS, ADD_BANNER, EDIT_BANNER, DELETE_BANNER}  from '../actions/BannerActions'


const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_BANNERS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_BANNER:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_BANNER:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_BANNER:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}
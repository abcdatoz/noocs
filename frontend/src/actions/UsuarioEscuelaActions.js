import axios from 'axios'
import { returnErrors } from './messages';


export const ADD_USUARIO_ESCUELA = 'ADD_USUARIO_ESCUELA'

export const addUsuarioEscuela = (registro,token) => (dispatch) =>{

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

     
    config.headers['Authorization'] = `Token ${token}`    

    

    axios.post ('/api/usuarioescuela/', registro, config)
        .then( res => {
            dispatch({
                type: ADD_USUARIO_ESCUELA,
                payload: res.data
            });
        })
        .catch( err => dispatch( returnErrors(err.response.data, err.response.status)));
};
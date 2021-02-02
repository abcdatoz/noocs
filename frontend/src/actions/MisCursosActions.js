import axios from 'axios'
import {createMessage, returnErrors} from './messages' 
import { tokenConfig } from './auth'

export const GET_MIS_CURSOS = 'GET_MIS_CURSOS';
export const ADD_MI_CURSO = 'ADD_MI_CURSO';
export const DELETE_MI_CURSO='DELETE_MI_CURSO';

export const  getMisCursos = () => (dispatch, getState) => {
    axios.get('/api/miscursos/')
        .then( res => {
                dispatch({ 
                    type: GET_MIS_CURSOS,
                    payload: res.data 
                });
            })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};  

export const addMiCurso = (registro) => (dispatch, getState) => {
    axios.post ('/api/miscursos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_MI_CURSO,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue guardado satisfactoriamente'}));
        })
        .catch( err =>  
            dispatch (returnErrors(err.response.data, err.response.status))
        );
};

 
export const deleteMiCurso = (id) => (dispatch, getState)=>{
    axios.delete(`/api/miscursos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_MI_CURSO,
                payload: id
            });
            dispatch(createMessage({msg:'El registro ha sido eliminado ...'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
};
import axios from 'axios'
import {createMessage, returnErrors} from './messages' 
import { tokenConfig } from './auth'

export const GET_CURSOS = 'GET_CURSOS';
export const ADD_CURSO = 'ADD_CURSO';
export const EDIT_CURSO = 'EDIT_CURSO';
export const DELETE_CURSO='DELETE_CURSO';

export const  getCursos = () => (dispatch, getState) => {
    axios.get('/api/curso/')
        .then( res => {
                dispatch({ 
                    type: GET_CURSOS,
                    payload: res.data 
                });
            })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};  

export const addCurso = (registro) => (dispatch, getState) => {
    axios.post ('/api/curso/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_CURSO,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue guardado satisfactoriamente'}));
        })
        .catch( err =>  
            dispatch (returnErrors(err.response.data, err.response.status))
        );
};

export const editCurso = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/curso/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_CURSO,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue actualizado satisfactoriamente'}));
        })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteCurso = (id) => (dispatch, getState)=>{
    axios.delete(`/api/curso/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_CURSO,
                payload: id
            });
            dispatch(createMessage({msg:'El registro ha sido eliminado ...'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
};
import axios from 'axios'
import {createMessage, returnErrors} from './messages' 
import { tokenConfig } from './auth'

export const GET_ESCUELAS = 'GET_ESCUELAS';
export const ADD_ESCUELA = 'ADD_ESCUELA';
export const EDIT_ESCUELA = 'EDIT_ESCUELA';
export const DELETE_ESCUELA ='DELETE_ESCUELA';

export const  getEscuelas = () => (dispatch, getState) => {
    axios.get('/api/escuela/')
        .then( res => {
                dispatch({ 
                    type: GET_ESCUELAS,
                    payload: res.data 
                });
            })
        .catch( err => dispatch ( returnErrors(err.response.data, err.response.status) ) );
};  

export const addEscuela = (registro) => (dispatch, getState) => {
    axios.post ('/api/escuela/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_ESCUELA,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue guardado satisfactoriamente'}));
        })
        .catch( err =>  
            dispatch (returnErrors(err.response.data, err.response.status))
        );
};

export const editEscuela = (registro, id) => (dispatch, getState) => {
    axios.put(`/api/escuela/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_ESCUELA,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue actualizado satisfactoriamente'}));
        })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteEscuela = (id) => (dispatch, getState)=>{
    axios.delete(`/api/escuela/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_ESCUELA,
                payload: id
            });
            dispatch(createMessage({msg:'El registro ha sido eliminado ...'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
};
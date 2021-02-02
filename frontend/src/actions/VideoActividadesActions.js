import axios from 'axios'
import {createMessage, returnErrors} from './messages' 
import { tokenConfig } from './auth'

export const GET_VIDEOACTIVIDADES = 'GET_VIDEOACTIVIDADES';
export const ADD_VIDEOACTIVIDAD = 'ADD_VIDEOACTIVIDAD';
export const EDIT_VIDEOACTIVIDAD = 'EDIT_VIDEOACTIVIDAD';
export const DELETE_VIDEOACTIVIDAD ='DELETE_VIDEOACTIVIDAD';

export const  getVideoActividades = () => (dispatch, getState) => {
    axios.get('/api/videoactividades/')
        .then( res => {
                dispatch({ 
                    type: GET_VIDEOACTIVIDADES,
                    payload: res.data 
                });
            })
        .catch( err => dispatch ( returnErrors(err.response.data, err.response.status) ) );
};  

export const addVideoActividad = (registro) => (dispatch, getState) => {
    axios.post ('/api/videoactividades/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_VIDEOACTIVIDAD,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue guardado satisfactoriamente'}));
        })
        .catch( err =>  
            dispatch (returnErrors(err.response.data, err.response.status))
        );
};

export const editVideoActividad = (registro, id) => (dispatch, getState) => {
    axios.put(`/api/videoactividades/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_VIDEOACTIVIDAD,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue actualizado satisfactoriamente'}));
        })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteVideoActividad = (id) => (dispatch, getState)=>{
    axios.delete(`/api/videoactividades/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_VIDEOACTIVIDAD,
                payload: id
            });
            dispatch(createMessage({msg:'El registro ha sido eliminado ...'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
};
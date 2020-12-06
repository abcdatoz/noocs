import axios from 'axios'
import {createMessage, returnErrors} from './messages' 
import { tokenConfig } from './auth'

export const GET_MUNICIPIOS = 'GET_MUNICIPIOS';
export const ADD_MUNICIPIO = 'ADD_MUNICIPIO';
export const EDIT_MUNICIPIO = 'EDIT_MUNICIPIO';
export const DELETE_MUNICIPIO ='DELETE_MUNICIPIO';

export const  getMunicipios = () => (dispatch, getState) => {
    axios.get('/api/municipio/')
        .then( res => {
                dispatch({ 
                    type: GET_MUNICIPIOS,
                    payload: res.data 
                });
            })
        .catch( err => dispatch ( returnErrors(err.response.data, err.response.status) ) );
};  

export const addMunicipio = (registro) => (dispatch, getState) => {
    axios.post ('/api/municipio/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_MUNICIPIO,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue guardado satisfactoriamente'}));
        })
        .catch( err =>  
            dispatch (returnErrors(err.response.data, err.response.status))
        );
};

export const editMunicipio = (registro, id) => (dispatch, getState) => {
    axios.put(`/api/municipio/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_MUNICIPIO,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue actualizado satisfactoriamente'}));
        })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteMunicipio = (id) => (dispatch, getState)=>{
    axios.delete(`/api/municipio/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_MUNICIPIO,
                payload: id
            });
            dispatch(createMessage({msg:'El registro ha sido eliminado ...'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
};
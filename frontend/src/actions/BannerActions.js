import axios from 'axios'
import {createMessage, returnErrors} from './messages' 
import { tokenConfig } from './auth'

export const GET_BANNERS = 'GET_BANNNERS';
export const ADD_BANNER = 'ADD_BANNER';
export const EDIT_BANNER = 'EDIT_BANNER';
export const DELETE_BANNER='DELETE_BANNER';

export const  getBanners = () => (dispatch, getState) => {
    axios.get('/api/banner/')
        .then( res => {
                dispatch({ 
                    type: GET_BANNERS,
                    payload: res.data 
                });
            })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};  

export const addBanner = (banner) => (dispatch, getState) => {
    axios.post ('/api/banner/', banner, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_BANNER,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue guardado satisfactoriamente'}));
        })
        .catch( err =>  
            dispatch (returnErrors(err.response.data, err.response.status))
        );
};

export const editBanner = ( banner, id) => (dispatch, getState) => {
    axios.put(`/api/banner/${id}`, banner, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_BANNER,
                payload: res.data
            });
            dispatch(createMessage({msg:'El registro fue actualizado satisfactoriamente'}));
        })
        .catch ( err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteBanner = (id) => (dispatch, getState)=>{
    axios.delete(`/api/banner/${id}`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_BANNER,
                payload: res.id
            });
            dispatch(createMessage({msg:'El registro ha sido eliminado ...'}));
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)));
};
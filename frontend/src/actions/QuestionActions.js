import axios from 'axios'
import { returnErrors} from './messages'
import { tokenConfig } from './auth'
import {getAnswers} from './AnswerActions'


export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const EDIT_QUESTION = 'EDIT_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'


export const getQuestions = ()  => (dispatch) => {
    axios.get('/api/question/') 
        .then( res => {
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            })
        })
        .catch( err => dispatch (returnErrors(err.response.data, err.response.status) ) )
}

export const addQuestion = (registro) => (dispatch, getState) => {
    axios.post ('/api/question/', registro, tokenConfig(getState))
        .then( res =>{
            dispatch({
                type: ADD_QUESTION,
                payload: res.data
            })
            dispatch(getAnswers())
        })
        .catch( err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const editQuestion = (registro, id ) => (dispatch, getState) => {
    axios.put (`/api/question/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_QUESTION,
                payload: res.data
            })
        })
        .catch( err => dispatch(returnErrors(err.response.data, err,response.status) ) )
}



export const deleteQuestion = (id) => (dispatch, getState)=>{
    axios.delete(`/api/question/${id}/`, tokenConfig(getState))
        .then( res =>{
            dispatch({
                type: DELETE_QUESTION,
                payload:id
            })
        })
        .catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}
import axios from 'axios'
import { returnErrors } from './messages'

export const GET_ANSWERS = 'GET_ANSWERS'

export const getAnswers = () => (dispatch) => {
    axios.get('/api/answer/')
        .then( res => {
            dispatch({
                type: GET_ANSWERS,
                payload: res.data
            })
        })
        .catch(err=> dispatch(returnErrors(err.response.data, err.response.status)))
}
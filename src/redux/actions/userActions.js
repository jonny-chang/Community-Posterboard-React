import { 
    SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_NEW_USER,
    SET_UNAUTHENTICATED, LOADING_USER, SET_LOCATION, CLEAR_LOCATION, SET_RESEND_STATUS,  
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
            .then(res => {
                setAuthorizationHeader(res.data.retrievedIdToken ?? res.data.token)
                dispatch(getUserData());
                dispatch({ type: SET_AUTHENTICATED })
                dispatch({ type: CLEAR_ERRORS });
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
            .then(res => {
                dispatch({ type: CLEAR_ERRORS });
                dispatch(setNewUser(true))
                history.push('/login');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
                console.log(err.response)
            })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED
    });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const setLocation = (position) => (dispatch) => {
    dispatch({
        type: SET_LOCATION,
        payload: position
    })
}

export const clearLocation = () => (dispatch) => {
    dispatch({ type: CLEAR_LOCATION })
    dispatch({ type: CLEAR_ERRORS })
}

export const setNewUser = (bool) => (dispatch) => {
    dispatch({
        type: SET_NEW_USER,
        payload: bool
    })
}

export const resendVerificationEmail = (userData) => (dispatch) => {
    axios.post('/send', userData)
        .then(res => {
            dispatch({
                type: SET_RESEND_STATUS,
                payload: 1
            })
        })
        .catch(err => {
            dispatch({ 
                type: SET_RESEND_STATUS,
                payload: 2 
            })
        })
}

export const setResendStatus = (status) => (dispatch) => {
    dispatch({
        type: SET_RESEND_STATUS,
        payload: status
    })
}

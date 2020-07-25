import axios from 'axios';
import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS, CREATE_POST, 
    SET_POSTS, LOADING_DATA, STOP_LOADING_UI, SET_POST 
} from '../types';


// Create Post

export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost)
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Get all posts

export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios.get('/posts')
        .then((res) => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

// Get single post

export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch((err) => console.log(err))
}

// Edit Post

export const editPost = (newPost, postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/editPost/${postId}`, newPost)
        .then(res => {
            dispatch({
                type: SET_POSTS,
            });
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

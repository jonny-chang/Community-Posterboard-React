import axios from 'axios';
import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS, CREATE_POST, STOP_LOADING_UI,
    SET_POSTS, LOADING_DATA, STOP_LOADING_DATA, SET_POST 
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
            dispatch(getPosts())
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
    dispatch({ type: LOADING_DATA });
    axios
      .get('/posts')
      .then((res) => {
        dispatch({
          type: SET_POSTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_POSTS,
          payload: []
        });
      });
  };

// Get single post

export const getPost = (postId) => (dispatch) => {
    // dispatch({ type: LOADING_UI });
    axios.get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
            // dispatch({ type: STOP_LOADING_DATA })
            // dispatch({ type: STOP_LOADING_UI })
        })
        .catch((err) => {
            console.log(err)
            console.log('error setting singular post')
            console.log('PostId: ' + postId)
        })
}

// Edit Post

export const editPost = (newPost, postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.put(`/post/${postId}`, newPost)
        .then(res => {
            dispatch(getPosts())
            dispatch({ type: CLEAR_ERRORS })
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Delete Post
export const deletePost = (postId) => (dispatch) => {
    axios
      .delete(`/post/${postId}`)
      .then(() => {
        dispatch(getPosts());
      })
      .catch((err) => {
          console.log(err)
      });
  };
import axios from 'axios';
import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS, CREATE_POST, STOP_LOADING_UI,
    SET_POSTS, LOADING_DATA, STOP_LOADING_DATA, SET_POST, CLEAR_POST, CLEAR_WEEK_DAY_NUMBER,
    SET_DAY_NUMBER, CLEAR_DAY_NUMBER, SET_SLOTS , CLEAR_CURRENT_SLOTS, CREATE_SLOT, SET_WEEK_DAY_NUMBER
} from '../types';

// Create Post

export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (newPost.longitude === 0 && newPost.latitude === 0){
        dispatch({ 
            type: SET_ERRORS,
            payload: {
                longitude: 'Invalid longitude',
                latitude: 'Invalid latitude'
            }
        })
    }
    else {
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

// Get post for custom day

export const getCustomPost = (postId, history) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    const millisecondsPerDay = 86400000;
    var offset = new Date().getTimezoneOffset()
    var offset = new Date()
    offset = offset.getTimezoneOffset() * 60000;
    var timeStamp = Date.now() - offset;
    var dayNumber = Math.floor(timeStamp/millisecondsPerDay);
    dispatch({
        type: SET_DAY_NUMBER,
        payload: dayNumber
    })
    axios.get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err.response)
            if (err.response.status === 404){
                history.push('/error')
            }
        })
}

// Get post for default day
export const getDefaultPost = (postId, history) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/post/${postId}`)
        .then((res) => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err.response)
            if (err.response.status === 404){
                history.push('/error')
            }
        })
}

// Clearing post

export const clearPost = () => (dispatch) => {
    dispatch({type: CLEAR_POST })
}

// Edit Post

export const editPost = (newPost, postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (newPost.longitude === 0 && newPost.latitude === 0){
        dispatch({ 
            type: SET_ERRORS,
            payload: {
                longitude: 'Invalid longitude',
                latitude: 'Invalid latitude'
            }
        })
    }
    else {
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

// Get slots of given day
export const getSlots = (postId, dayNumber, isCustom) => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    axios.get(`/post/${postId}/slots?dayNumber=${dayNumber}&isCustom=${isCustom}`)
        .then((res) => {
            dispatch({ 
                type: SET_SLOTS,
                payload: res.data
            })
            console.log(res)
        })
        .catch((err) => {
           console.log(err.response)
        })
}

// Set week day number
export const setWeekDayNumber = (weekDayNumber) => (dispatch) => {
    dispatch({
        type: SET_WEEK_DAY_NUMBER,
        payload: weekDayNumber
    })
}

// Clear current day slots
export const clearSlots = () => (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_SLOTS
    })
}

// Clear day number
export const clearDayNumber = () => (dispatch) => {
    dispatch({
        type: CLEAR_DAY_NUMBER
    })
}

// Clear week day number
export const clearWeekDayNumber = () => (dispatch) => {
    dispatch({
        type: CLEAR_WEEK_DAY_NUMBER
    })
}

// Start loading data
export const loadData = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })
}

// Create custom slot
export const createSlot = (postId, newSlot, dayNumber) => (dispatch) => {
    axios.post(`/post/${postId}/slot`, newSlot)
        .then(res => {
            dispatch({
                type: CREATE_SLOT,
                payload: res.data
            });
            if (dayNumber >= 0 && dayNumber < 7){
                dispatch(getSlots(postId, dayNumber, false))
                dispatch({ type: CLEAR_ERRORS })
            }
            else {
                dispatch(getSlots(postId, dayNumber, true))
                dispatch({ type: CLEAR_ERRORS })
            }
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            console.log(err.response)
        })
}

// Delete Slot
export const deleteSlot = (postId, slotId, dayNumber, isCustom) => (dispatch) => {
    console.log(`/post/${postId}/slot/${slotId}?dayNumber=${dayNumber}isCustom=${isCustom}`)
    axios.delete(`/post/${postId}/slot/${slotId}?dayNumber=${dayNumber}isCustom=${isCustom}`)
      .then(() => {
        dispatch(getSlots(postId, dayNumber, isCustom));
        dispatch({ type: CLEAR_ERRORS })
      })
      .catch((err) => {
          console.log(err.response)
          dispatch({
              type: SET_ERRORS,
              payload: {
                  deletion: true
              }
          })
      });
  };

// Edit slot
export const editSlot = (postId, slotId, newSlot, dayNumber, isCustom) => (dispatch) => {
    console.log(`/post/${postId}/slot/${slotId}?dayNumber=${dayNumber}&isCustom=${isCustom}`)
    axios.put(`/post/${postId}/slot/${slotId}?dayNumber=${dayNumber}&isCustom=${isCustom}`, newSlot)
        .then(res => {
            dispatch(getSlots(postId, dayNumber, isCustom))
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
  }

// Clears errors
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

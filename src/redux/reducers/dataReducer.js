import { LOADING_DATA, SET_POSTS , CREATE_POST, SET_LOCATION, CLEAR_LOCATION } from '../types';

const initialState = {
    posts: [],
    post: {},
    position: {
        latitude: 0,
        longitude: 0
    },
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case SET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }
        case CREATE_POST:
            return{
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case SET_LOCATION:
            return{
                ...state,
                position: action.payload
            }
        case CLEAR_LOCATION:
            return{
                ...state,
                position: {}
            }
        default:
            return state
    }
}

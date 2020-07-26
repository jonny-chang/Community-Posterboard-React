import { LOADING_DATA, SET_POSTS , CREATE_POST, CLEAR_POST,
    SET_LOCATION, CLEAR_LOCATION, SET_POST, STOP_LOADING_DATA 
} from '../types';

const initialState = {
    posts: [],
    post: {},
    position: {
        latitude: 0,
        longitude: 0
    },
    loading: false,
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case STOP_LOADING_DATA:
            return{
                ...state,
                loading: false
            }
        case SET_POSTS:
            return{
                ...state,
                posts: action.payload.posts,
                loading: false
            }
        case SET_POST:
            return{
                ...state,
                post: action.payload,
            }
        case CREATE_POST:
            return{
                ...state,
            }
        case SET_LOCATION:
            return{
                ...state,
                position: action.payload
            }
        case CLEAR_LOCATION:
            return{
                ...state,
                position: {
                    latitude: 0,
                    longitude: 0
                },
            }
        case CLEAR_POST:
            return{
                ...state,
                post: {}
            }
        default:
            return state
    }
}

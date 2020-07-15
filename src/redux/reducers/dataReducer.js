import { LOADING_DATA, SET_POSTS , CREATE_POST, 
    SET_LOCATION, CLEAR_LOCATION, SET_POST 
} from '../types';

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
        case SET_POST:
            return{
                ...state,
                post: action.payload
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
                position: action.payload,
                loading: false
            }
        case CLEAR_LOCATION:
            return{
                ...state,
                position: {
                    latitude: 0,
                    longitude: 0
                }
            }
        default:
            return state
    }
}

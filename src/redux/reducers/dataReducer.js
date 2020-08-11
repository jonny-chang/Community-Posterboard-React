import { LOADING_DATA, SET_POSTS , CREATE_POST, CLEAR_POST, 
    SET_DAY_NUMBER, DELETE_POST, LOADING_STORE_NAME,
    SET_LOCATION, CLEAR_LOCATION, SET_POST, STOP_LOADING_DATA, 
    SET_SLOTS, CLEAR_CURRENT_SLOTS, CREATE_SLOT, GET_POST_ERROR, GET_SLOT_ERROR, ADD_CUSTOM_DAY
} from '../types';

const initialState = {
    posts: [],
    post: [],
    position: {
        latitude: 0,
        longitude: 0
    },
    loading: false,
    dayNumber: null,
    dayNumber: null,
    currentSlots: {},
    loadingName: false,
    getPostError: false,
    getSlotError: false
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
                loadingName: false
            }
        case CREATE_POST:
            return{
                ...state,
            }
        case CREATE_SLOT:
            if (action.dayNumber > 6) {
                if (!state.post.customDays.includes(action.dayNumber)){
                    state.post.customDays.push(action.dayNumber)
                }
            }
            return{
                ...state,
            }
        case ADD_CUSTOM_DAY:
            if (!state.post.customDays.includes(action.dayNumber)){
                state.post.customDays.push(action.dayNumber)
            }
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
                post: []
            }
        case SET_DAY_NUMBER:
            return{
                ...state,
                dayNumber: action.payload
            }
        case SET_SLOTS:
            return{
                ...state,
                currentSlots: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_SLOTS:
            return{
                ...state,
                currentSlots: {}
            }
        case DELETE_POST:
            let index = state.posts.findIndex(
                (post) => post.postId === action.payload
              );
              state.posts.splice(index, 1);
              return {
                ...state
            }
        case LOADING_STORE_NAME:
            return{
                ...state,
                loadingName: true
            }
        case GET_POST_ERROR:
            return{
                ...state,
                getPostError: action.payload
            }
        case GET_SLOT_ERROR:
            return{
                ...state,
                getSlotError: action.payload
            }
        default:
            return state
    }
}

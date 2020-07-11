import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

// Init state
const initialState = {};

// Allows for async code using dispatch()
const middleware = [thunk];

// Combine reducers as they are in separate files
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

// Init store (last line is store reducer)
const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;

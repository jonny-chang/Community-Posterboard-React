import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import themeFile from './util/theme';

// Pages
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import customSchedulePage from './pages/customSchedulePage';
import homeSchedulePage from './pages/homeSchedulePage';
import defaultSchedulePage from './pages/defaultSchedulePage';
import error from './pages/error';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import UnauthRoute from './util/UnauthRoute';
import ExtraRoute from './util/ExtraRoute';


// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

axios.defaults.baseURL = 'https://us-central1-communityposterboard-69961.cloudfunctions.net/api'
const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  }  
  else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const theme = createMuiTheme(themeFile);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar /> 
            <div className="container">
              <Switch>
                <UnauthRoute exact path='/login' component={login}/>
                <UnauthRoute exact path='/register' component={signup}/>
                <UnauthRoute exact path='/signup' component={signup}/>
                <AuthRoute exact path='/' component={home}/>
                <AuthRoute exact path='/schedule/:postId' component={homeSchedulePage}/>
                <AuthRoute exact path='/schedule/:postId/customdays' component={customSchedulePage}/>
                <AuthRoute exact path='/schedule/:postId/defaultdays' component={defaultSchedulePage}/>
                <Route exact path='/error' component={error}/>
                <Route path='/' component={error}/>
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
    )
  }
}

export default App

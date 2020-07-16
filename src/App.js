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

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import UnauthRoute from './util/UnauthRoute';


// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

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
                <Route exact path='/login' component={login}/>
                <Route exact path='/signup' component={signup}/>
                <Route exact path='/' component={home}/>
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
    )
  }
}

export default App

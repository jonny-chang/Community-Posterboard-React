import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UnauthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props}/>} />
)

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

UnauthRoute.propTypes = {
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(UnauthRoute)
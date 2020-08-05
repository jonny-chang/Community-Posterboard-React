import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render={(props) => authenticated === false ? <Redirect to='/error'/> : <Redirect to='/error'/>} />
)

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

AuthRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(AuthRoute)
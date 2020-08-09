import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'

// Images
import Logo from '../images/Logo.png';

// Mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from '../redux/actions/userActions';

const styles = {
    button: {
        position: 'absolute',
        right: '20px'
    },
    header: {
        margin: 'auto',
    },
    title: {
        color: '#fff'
    },
    image: {
        left: 'absolute',
        right: '20px',
        height: '35px',
        width: '35px'
    },
}

class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser()
        window.location.href = '/login';
    }
    render() {
        const { classes, user: { authenticated } } = this.props
        return (
            <AppBar position="fixed"  className={classes.appBar} color='primary'>
                <Toolbar>
                    <img src={Logo} className={classes.image}/>
                    <div className={classes.header}>
                        <a href='/' className={classes.title}>
                            <h2>Skipt</h2>
                        </a>
                    </div>
                    {authenticated && (
                        <Button 
                        className={classes.button} 
                        color='#fff' 
                        onClick={this.handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>   
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStatesToProps, mapActionsToProps)(withStyles(styles)(Navbar))

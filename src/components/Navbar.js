import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'

// Images
import NewLogoBackground from '../images/NewLogoBackground.png';

// Mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const styles = {
    button: {
        position: 'absolute',
        right: '20px',
        color: '#fff',
        marginTop: '18px'
    },
    header: {
        margin: 'auto',
        textAlign: 'center'
    },
    title: {
        color: '#fff'
    },
    image: {
        left: 'absolute',
        right: '20px',
        height: '35px',
        width: '35px',
        marginTop: '18px'
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
                    <Grid container>
                        <Grid item xs={2}>
                            <a href ='/'>
                                <img src={NewLogoBackground} className={classes.image}/>
                            </a>
                        </Grid>
                        <Grid item xs={8}>
                            <div className={classes.header}>
                                <a href='/' className={classes.title}>
                                    <h2>Skipt</h2>
                                </a>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            {authenticated && (
                                <Button 
                                className={classes.button} 
                                color='#fff' 
                                onClick={this.handleLogout}
                                >
                                    Logout
                                </Button>
                            )}
                        </Grid>
                    </Grid>
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

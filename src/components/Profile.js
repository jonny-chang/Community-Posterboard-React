import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Mui
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';

const styles = {
    paper: {
        padding: 20,
        marginTop: 15
    },
    profile: {
        
    },
    text: {
        marginBottom: 10
    },
    button: {
        float: 'right',
    }
}

class Profile extends Component {
    render() {
        const { classes, user: email, loading } = this.props
        return (
            <div>
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <Button className={classes.button}>
                            Edit Profile
                        </Button>
                        <Typography variant='h5' className={classes.text}>
                            Name
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.text}>
                            email
                        </Typography>                        
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));

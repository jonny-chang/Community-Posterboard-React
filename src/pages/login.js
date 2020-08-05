import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Util/Components
import UtilButton from '../util/UtilButton';

// Mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import { loginUser, setNewUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    newUserCardContainer: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    card: {
        display: 'flex',
        marginTop: 20,
    },
    newUserCard: {
        display: 'flex',
        marginTop: 20,
        backgroundColor: '#98FB98'
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    },
    newUserContent: {
        padding: 10,
        objectFit: 'cover',
    },
    progressSpinner: {
        position: 'absolute'
    },
    dialogContentContainer: {
        marginBottom: 15
    },
    cancel: {
        marginBottom: 15
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '2%'
    },
}

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
            open: false
        }
    }
    // Setting errors for local state
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    componentWillUnmount(){
        this.props.setNewUser(false)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        // Redux login call
        this.props.loginUser(userData, this.props.history)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleClose = (event) => {
        this.props.clearErrors()
        this.setState({ errors: {} })
    }
    render() {
        const { classes, UI: { loading }, user: { newUser } } = this.props;
        const { errors } = this.state;
        return (
            <Fragment>
                {newUser && (
                    <Grid container className={classes.newUserCardContainer}>
                        <Grid item sm />
                        <Grid item sm>
                            <Card className={classes.newUserCard}>
                                <CardContent className={classes.newUserContent}>
                                    <Typography variant='body2'>
                                        We have sent a confirmation link to your email address. 
                                        Please click on the link to verify your email address 
                                        in order to login successfully.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm />
                    </Grid>
                )}
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            {errors.noVerification && (
                                <Dialog open={true} onClose={this.handleClose} fullWidth maxWidth="sm">
                                <UtilButton 
                                tip='Done' 
                                onClick={this.handleClose} 
                                tipClassName={classes.closeButton}>
                                    <CloseIcon/>
                                </UtilButton>
                                <DialogTitle>Email verification error</DialogTitle>
                                <DialogContent>
                                    <div className={classes.dialogContentContainer}>
                                        <Typography variant='body2'>
                                            You're email has not been verified
                                        </Typography>
                                    </div>
                                    <Button variant="contained" variant="text" size="small"
                                    className={classes.cancel} onClick={this.handleClose}>
                                        Done
                                    </Button>
                                </DialogContent>
                            </Dialog>
                            )}
                                
                            <Typography variant="h3" className={classes.pageTitle}>
                                Login
                            </Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField id="email" name="email" type="email" label="Email" 
                                className={classes.textField} value={this.state.email} 
                                onChange={this.handleChange} helperText={errors.email} 
                                error={errors.email ? true : false} fullWidth required
                                />
                                <TextField id="password" name="password" type="password" label="Password" 
                                className={classes.textField} value={this.state.password} 
                                onChange={this.handleChange} helperText={errors.password} 
                                error={errors.password ? true : false} fullWidth required
                                />
                                {errors.general && (
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                )}
                                {errors.error && (
                                    <Typography variant="subtitle1" color="error">
                                        Error: {errors.error}
                                    </Typography>
                                )}
                                <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loading}
                                >
                                Login
                                {loading && (
                                    <CircularProgress size={20} className={classes.progressSpinner} />
                                )}
                                </Button>
                                <br/>
                                <br/>
                                <small >
                                    Don't have an account? <Link to="/register">Register now</Link>
                                </small>
                            </form>
                        </CardContent>
                        </Card>
                        <br/>
                        {/* <Typography variant="caption" color="textSecondary" inLine>

                        </Typography>
                        <br/>
                        <Typography variant="caption" color="textSecondary">

                        </Typography> */}
                    </Grid>
                    <Grid item sm />
                </Grid>
            </Fragment>
        )
    }
}

// Checking prop types
login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

// Takes global state and returns what is needed
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

// Declaring what actions will be used
const mapActionsToProps = {
    loginUser,
    clearErrors,
    setNewUser
}

// Connect function connects to redux state
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

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
import MuiAlert from '@material-ui/lab/Alert';

// Redux
import { connect } from 'react-redux';
import { loginUser, setNewUser, resendVerificationEmail, setResendStatus } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/dataActions';

// Images
import Logo from '../images/Logo.png'

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
    resendErrorCard: {
        display: 'flex',
        marginTop: 20,
        backgroundColor: '#ffcccb'
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
    image: {
        height: '75px',
        width: '75px'
    },
    copyright: {
        position: 'fixed',
        bottom: '10px',
        left: '12px',
    },
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
            open: false,
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
        this.props.setResendStatus(0)
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
    handleResend = (event) => {
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.resendVerificationEmail(userData)
        this.handleClose()
    }
    render() {
        const { classes, UI: { loading }, user: { newUser, resendStatus } } = this.props;
        const { errors } = this.state;
        return (
            <Fragment>
                {(newUser && (resendStatus !== 1 && resendStatus !== 2)) && (
                    <Grid container className={classes.newUserCardContainer}>
                        <Grid item sm />
                        <Grid item sm>
                            {/* <Card className={classes.newUserCard}>
                                <CardContent className={classes.newUserContent}> */}
                                    <Alert severity="success">
                                        We have sent a confirmation link to your email address. 
                                        Please click on the link to verify your email address 
                                        in order to login successfully.
                                    </Alert>
                                {/* </CardContent>
                            </Card> */}
                        </Grid>
                        <Grid item sm />
                    </Grid>
                )}
                {resendStatus === 1 && (
                    <Grid container className={classes.newUserCardContainer}>
                        <Grid item sm />
                        <Grid item sm>
                            {/* <Card className={classes.newUserCard}>
                                <CardContent className={classes.newUserContent}> */}
                                    <Alert severity="info">
                                        A verification email has been resent to your email address. 
                                        Please follow the instructions in the email in order to login successfully.
                                    </Alert>
                                {/* </CardContent>
                            </Card> */}
                        </Grid>
                        <Grid item sm />
                    </Grid>
                )}
                {resendStatus === 2 && (
                    <Grid container className={classes.newUserCardContainer}>
                        <Grid item sm />
                        <Grid item sm>
                            {/* <Card className={classes.resendErrorCard}>
                                <CardContent className={classes.newUserContent}> */}
                                    <Alert severity="error">
                                        An error occured resending the verification email. Please try again.
                                    </Alert>
                                {/* </CardContent>
                            </Card> */}
                        </Grid>
                        <Grid item sm />
                    </Grid>
                )}
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        {/* <Card className={classes.card}>
                        <CardContent className={classes.content}> */}
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
                                        <Typography variant='body2' display='inline'>
                                            You're email address has not been verified, click
                                            <a href="#" onClick={this.handleResend}> here </a>
                                            to resend the verification email.
                                        </Typography>
                                    </div>
                                    <Button variant="contained" variant="text" size="small"
                                    className={classes.cancel} onClick={this.handleClose}>
                                        Done
                                    </Button>
                                </DialogContent>
                            </Dialog>
                            )}
                            <img src={Logo} className={classes.image}/>
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
                        {/* </CardContent>
                        </Card> */}
                        <br/>
                        {/* <Typography variant="caption" color="textSecondary" inLine>

                        </Typography>
                        <br/>
                        <Typography variant="caption" color="textSecondary">

                        </Typography> */}
                    </Grid>
                    <Grid item sm />
                </Grid>
                <Typography variant='caption' className={classes.copyright}>
                    © Skipt 2020
                </Typography>
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
    setNewUser,
    resendVerificationEmail,
    setResendStatus
}

// Connect function connects to redux state
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

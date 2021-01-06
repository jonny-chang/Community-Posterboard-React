import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// Images
import NewLogo from '../images/NewLogo.png'

const styles = {
    form: {
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
    content: {
        padding: 25,
        objectFit: 'cover',
    },
    progressSpinner: {
        position: 'absolute'
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

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Fragment>
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        {/* <Card className={classes.card}>
                            <CardContent className={classes.content}> */}
                                <img src={NewLogo} className={classes.image}/>                        
                                <Typography variant="h3" className={classes.pageTitle}>
                                    Register
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
                                    <TextField id="confirmPassword" name="confirmPassword" type="password" 
                                    label="Confirm Password" className={classes.textField}
                                    value={this.state.confirmPassword} onChange={this.handleChange} 
                                    helperText={errors.confirmPassword} 
                                    error={errors.confirmPassword ? true : false} fullWidth required
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
                                    Sign up
                                    {loading && (
                                        <CircularProgress size={20} className={classes.progressSpinner} />
                                    )}
                                    </Button>
                                    <br/>
                                    <br/>
                                    <small >
                                    Already have an account? <Link to="/login">Login now</Link>
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
                {/* <Typography variant='caption' className={classes.copyright}>
                    © Skipt 2020
                </Typography> */}
            </Fragment>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))

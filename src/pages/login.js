import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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
        marginTop: 30
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    card: {
        display: 'flex',
        marginTop: 10,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    },
}

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    // Setting errors for local state
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
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
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Card className={classes.card}>
                     <CardContent className={classes.content}>
                        <Typography variant="h3" className={classes.pageTitle}>
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField id="email" name="email" type="email" label="Email" 
                            className={classes.textField} value={this.state.email} 
                            onChange={this.handleChange} helperText={errors.email} 
                            error={errors.email ? true : false} fullWidth
                            />
                            <TextField id="password" name="password" type="password" label="Password" 
                            className={classes.textField} value={this.state.password} 
                            onChange={this.handleChange} helperText={errors.password} 
                            error={errors.password ? true : false} fullWidth
                            />
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                                Login
                            </Button>
                            <br/>
                            <br/>
                            <small >
                                Don't have an account? <Link to="/signup">Register now</Link>
                            </small>
                        </form>
                     </CardContent>
                    </Card>
                    <br/>
                    <Typography variant="caption" color="textSecondary" inLine>
                        Rbad Studios, Inc.
                    </Typography>
                    <br/>
                    <Typography variant="caption" color="textSecondary">
                        1050 Granville St, Vancouver, BC V6Z 1L5
                    </Typography>
                </Grid>
                <Grid item sm />
            </Grid>
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
    loginUser
}

// Connect function connects to redux state
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

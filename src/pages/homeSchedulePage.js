import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    buttonContainer: {
        marginTop: 30,
        textAlign: 'center'
    },
    backButton: {
        marginTop: '10px',
    },
}

class homeSchedulePage extends Component {
    state = {
        postId: null
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId
        })
    }
    render() {
        const { postId } = this.state
        const { classes } = this.props
        return (
            <Grid container>
                <Grid item sm={2}>
                    <Button 
                    component={Link} 
                    to="/" 
                    className={classes.backButton} 
                    variant='outlined' 
                    color='inherit'
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item sm={4} className={classes.buttonContainer}>
                    <Button component={Link} to={`/schedule/${postId}/defaultdays`}>
                        Default days
                    </Button>
                </Grid>
                <Grid item sm={4} className={classes.buttonContainer}>
                    <Button component={Link} to={`/schedule/${postId}/customdays`}>
                        Custom days
                    </Button>
                </Grid>
                <Grid item sm={2}/>
            </Grid>
        )
    }
}

export default withStyles(styles)(homeSchedulePage);

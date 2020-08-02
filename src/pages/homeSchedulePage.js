import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

// React
import { connect } from 'react-redux';
import { getPost, clearPost } from '../redux/actions/dataActions';
import { Typography } from '@material-ui/core';

const styles = {
    buttonContainer: {
        marginTop: 30,
        textAlign: 'center'
    },
    backButton: {
        marginTop: '10px',
    },
    loadingContainer: {
        marginTop: 20,
        height: 100,
        width: 'auto',
        textAlign: 'center',
    },
    loadingIndicator: {
      position: 'relative',
      top: '20px',
    },
    titleContainer: {
        textAlign: 'center',
        marginTop: 10
    },
    daysButton: {
        marginTop: 20
    }
}

class homeSchedulePage extends Component {
    state = {
        postId: null,
        loading: true
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId
        })
        this.props.getPost(postId, this.props.history)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.post !== this.props.data.post && nextProps.data.post.length !== 0){
            this.setState({
                loading: false
            })
        }
    }
    componentWillUnmount() {
        this.props.clearPost()
    }
    render() {
        const { postId, loading } = this.state
        const { classes, data: { post: { title } } } = this.props
        let titleMarkup = !loading ? (
            <div className={classes.titleContainer}>
                <Typography variant='caption'>
                    Schedule of
                </Typography>
                <Typography variant='h5'>
                    {title}
                </Typography>
            </div>
        ) : (
            null
        )
        return (
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        {!loading && (
                            <Button 
                            component={Link} 
                            to="/" 
                            className={classes.backButton} 
                            variant='outlined' 
                            color='inherit'
                            >
                                Back
                            </Button>
                        )}
                    </Grid>   
                    <Grid item xs={6} sm={6}>
                        {loading && (
                            <div className={classes.loadingContainer}>
                                <CircularProgress size={50} className={classes.loadingIndicator}/>                
                            </div>
                        )}
                        {titleMarkup}
                    </Grid>
                    <Grid item xs={3}/>
                </Grid>
                {!loading && (
                    <Grid container>
                        <Grid item sm={2}/>
                        <Grid item sm={4} className={classes.buttonContainer}>
                            <Button 
                            component={Link} 
                            to={`/schedule/${postId}/defaultdays`} 
                            className={classes.daysButton}
                            size='large'
                            variant='contained'
                            >
                                Default days
                            </Button>
                        </Grid>
                        <Grid item sm={4} className={classes.buttonContainer}>
                            <Button 
                            component={Link} 
                            to={`/schedule/${postId}/customdays`}
                            className={classes.daysButton}
                            size='large'
                            variant='contained'
                            >
                                Custom days
                            </Button>
                        </Grid>
                        <Grid item sm={2}/>
                    </Grid>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getPost,
    clearPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(homeSchedulePage));

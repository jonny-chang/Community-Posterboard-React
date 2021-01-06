import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Components
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

// Mui
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';

// Redux
import { connect } from 'react-redux';
import { getPosts, setGetErrors } from '../redux/actions/dataActions';

const styles = {
    posts: {
        
    },
    createButton: {
        textAlign: 'center',
        marginTop: '20px'
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
    noPosts: {
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    noPostsContainer: {
        textAlign: 'center'
    },
    icon: {
        marginTop: 20
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

class home extends Component {
    state = {
        open: true
    }
    // Fetching posts
    componentDidMount() {
        this.props.getPosts();
      }
    componentWillUnmount() {
        this.props.setGetErrors(false, 'post')
    }
    render() {
        const { classes } = this.props;
        const { posts, loading, getPostError } = this.props.data;
        let postsMarkup = !loading ? (
            (posts && posts.length > 0) ? (
                posts.map((post) => <Post post={post} key={post.postId}/>)
            ) : (
                <div className={classes.noPostsContainer}>
                    {/* <StoreIcon fontSize='large' className={classes.icon}/> */}
                    <Typography variant='body1' className={classes.noPosts}>
                        You currently have no posts
                    </Typography>
                    {/* <Typography variant='body1' className={classes.noPosts}>
                        Click on the button below to create your first post
                    </Typography> */}
                </div>
            )           
          ) : (
            <div className={classes.loadingContainer}>
                <CircularProgress size={50} className={classes.loadingIndicator}/>                
            </div>
          );
        return (
            <Fragment>
                {(getPostError) && (
                    <Alert severity="error">
                        There was an error retrieving your posts, please refresh the page
                    </Alert>
                )}                 
                <Grid container spacing={3} className={classes.posts}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        {postsMarkup}
                        {!loading && (
                            <div className={classes.createButton}>
                                <CreatePost/>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
                {/* <Typography variant='caption' className={classes.copyright}>
                    © Skipt 2020
                </Typography> */}
            </Fragment>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getPosts,
    setGetErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));

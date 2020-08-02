import React, { Component, Fragment } from 'react'
import UtilButton from '../util/UtilButton';
import PropTypes from 'prop-types';

// Components
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Profile from '../components/Profile';

// Mui
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

const styles = {
    posts: {
        
    },
    createButton: {
        textAlign: 'center',
        marginTop: '10px'
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
        textAlign: 'center'
    },
    noPostsContainer: {
        textAlign: 'center'
    }
}

class home extends Component {
    // Fetching posts
    componentDidMount() {
        this.props.getPosts();
      }
    render() {
        const { classes } = this.props;
        const { posts, loading } = this.props.data;
        let postsMarkup = !loading ? (
            (posts && posts.length > 0) ? (
                posts.map((post) => <Post post={post} key={post.postId}/>)
            ) : (
                <div className={classes.noPostsContainer}>
                    <Typography variant='body1' className={classes.noPosts}>
                        You currently have no posts
                    </Typography>
                    <Typography variant='body1' className={classes.noPosts}>
                        Click on the button below to create your first post
                    </Typography>
                </div>
            )           
          ) : (
            <div className={classes.loadingContainer}>
                <CircularProgress size={50} className={classes.loadingIndicator}/>                
            </div>
          );
        return (
            <Fragment>
                <Grid container spacing={3} className={classes.posts}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        {postsMarkup}
                        <div className={classes.createButton}>
                            <CreatePost/>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
                
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
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));

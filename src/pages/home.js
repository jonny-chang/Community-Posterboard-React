import React, { Component, Fragment } from 'react'
import UtilButton from '../util/UtilButton';
import PropTypes from 'prop-types';

// Components
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Profile from '../components/Profile';
import PostSkeleton from '../util/PostSkeleton';

// Mui
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

const styles = {
    posts: {
        
    },
    createButton: {
        textAlign: 'center',
        marginTop: '10px'
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
            posts.map((post) => <Post post={post} />)
          ) : (
            <PostSkeleton/>
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

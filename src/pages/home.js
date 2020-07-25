import React, { Component, Fragment } from 'react'
import UtilButton from '../util/UtilButton';

// Components
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Profile from '../components/Profile';

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
    constructor(){
        super();
        this.state = {
            posts: null
        }
    }
    // Fetching posts
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Grid container spacing={3} className={classes.posts}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <Post/>
                        <Post/>
                        <Post/>
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

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));

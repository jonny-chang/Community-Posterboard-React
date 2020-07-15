import React, { Component, Fragment } from 'react'
import UtilButton from '../util/UtilButton';

// Components
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Profile from '../components/Profile';

// Mui
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    posts: {
        
    },
    createButton: {
        textAlign: 'center',
        marginTop: '10px'
    }
}

class home extends Component {
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

export default withStyles(styles)(home);

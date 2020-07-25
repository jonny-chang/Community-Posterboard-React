import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeletePost from './DeletePost';

// Redux
import { connect } from 'react-redux';
import { getPost, getPosts } from '../redux/actions/dataActions';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginTop: 15,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    },
    title: {
        marginBottom: 10
    },
    description: {
        marginBottom: 5
    },
    deleteContainer:{
        
    }
}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            post: {
              title,
              description,
              defaultCapacity,
              locationString,
              postId
            },
          } = this.props;
          const deleteButton =
            <DeletePost postId={postId}/>
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant='h5' className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.description}>
                        {description}
                    </Typography>
                    <Typography variant="body1">
                        Schedule, buttons, etc...
                    </Typography>
                    <div className={classes.deleteContainer}>
                        {deleteButton}
                    </div>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getPost,
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));

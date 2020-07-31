import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

// Redux
import { connect } from 'react-redux';
import { getPost, getPosts } from '../redux/actions/dataActions';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    capacity: {
        marginBottom: 5
    },
    address: {
        marginBottom: 5,
    },
    deleteContainer:{

    }
}

class Post extends Component {
    render() {
        const {
            classes,
            post,
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
          const editButton = 
            <EditPost currentPostId={postId} currentPost={post}/>
          const scheduleButton =
            <Button component={Link} to={`/schedule/${postId}`}>
                Schedule
            </Button>
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant='h5' className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" className={classes.capacity}>
                        Default Capacity: {defaultCapacity} | Address: {locationString}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.description}>
                        Description: {description}
                    </Typography>
                    {editButton}
                    {scheduleButton}
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

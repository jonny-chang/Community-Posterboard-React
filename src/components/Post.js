import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

// Redux
import { connect } from 'react-redux';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ScheduleIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const styles = {
    card: {
        display: 'flex',
        marginTop: 15,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    },
    paper: {
        padding: 25,
        marginTop: 15,
        backgroundColor: '#f5f5f5'
    },
    title: {
        marginBottom: 10,
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
    scheduleIcon: {
        color: '#228B22'
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
            <Tooltip title='Edit schedule'>
                <IconButton component={Link} to={`/schedule/${postId}`}>
                    <ScheduleIcon className={classes.scheduleIcon}/>
                </IconButton>
            </Tooltip>
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                {/* <Paper className={classes.paper} variant='outlined'> */}
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
                    <Typography variant="body2" color="textSecondary" variant='block'>
                        │
                    </Typography>
                    {scheduleButton}
                    <Typography variant="body2" color="textSecondary" variant='block'>
                        │
                    </Typography>
                    {deleteButton}
            {/* </Paper> */}
                 </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));

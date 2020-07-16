import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
    }

}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { 
            classes
         } = this.props
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant='h5'>
                        Title of store
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Description
                    </Typography>
                    <Typography variant="body1">
                        Schedule, buttons, etc...
                    </Typography>
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

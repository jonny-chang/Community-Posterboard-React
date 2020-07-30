import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import DeleteSlot from './DeleteSlot';
import EditPost from './EditPost';

// Redux
import { connect } from 'react-redux';
import { getPost, getPosts, loadData } from '../redux/actions/dataActions';

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

class Slot extends Component {
    handleLoading = () => {
        this.props.loadData()
    }
    render() {
        const {
            data: {
                slots,
                post,
                dayNumber
            },
            classes
          } = this.props;
          const deleteButton =
            <DeleteSlot postId={post.postId} dayNumber={dayNumber} slotId={slots.slotId}/>
          const editButton = null
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant='h5' className={classes.title}>
                        Slots
                    </Typography>
                    {editButton}
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
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Slot));

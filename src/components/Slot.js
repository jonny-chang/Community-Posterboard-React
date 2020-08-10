import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteSlot from './DeleteSlot';
import EditSlot from './EditSlot';
import ViewParticipants from './ViewParticipants';

// Redux
import { connect } from 'react-redux';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

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

    },
}

class Slot extends Component {
    handleLoading = () => {
        this.props.loadData()
    }
    timeToString = (totalMinutes) => {
        var hour = Math.floor(totalMinutes/60)
        if (totalMinutes >= 720) {
            hour = hour - 12
        }
        if (hour === 0) {
            hour = 12
        }
        var minutes = totalMinutes % 60
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (totalMinutes < 720) {
            return hour + ':' + minutes + ' a.m.'
        }
        else {
            return hour + ':' + minutes + ' p.m.'
        }
    }
    render() {
        const {
            data: {
                post,
                dayNumber
            },
            thisSlot,
            classes,
            isCustom,
            view
          } = this.props;
        var newStartTime = this.timeToString(thisSlot.startTime)
        var newEndTime = this.timeToString(thisSlot.endTime)
        const deleteButton =
            <DeleteSlot 
            postId={post.postId} 
            dayNumber={dayNumber} 
            slotId={thisSlot.slotId} 
            isCustom={isCustom}/>
        const editButton = 
            <EditSlot 
            postId={post.postId} 
            dayNumber={dayNumber}
            slot={thisSlot}
            isCustom={isCustom} 
            />
        var newStartTime = this.timeToString(thisSlot.startTime)
        var newEndTime = this.timeToString(thisSlot.endTime)
        return (
            <Grow in={true} timeout={1200}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant='h5' className={classes.title}>
                            Start time: {newStartTime} | End time: {newEndTime}
                        </Typography>
                        {view === 'custom' && (
                            <Typography variant="subtitle2" color="textSecondary" className={classes.capacity}>
                                Capacity: {thisSlot.capacity} | Spots taken: {thisSlot.spotsTaken}
                            </Typography>
                        )}
                        {view === 'default' && (
                            <Typography variant="subtitle2" color="textSecondary" className={classes.capacity}>
                                Capacity: {thisSlot.capacity}
                            </Typography>
                        )}
                        {editButton}
                        <Typography variant="body2" color="textSecondary" variant='block'>
                            │
                        </Typography>
                        {/* {view === 'custom' && (
                            <Fragment>
                                <ViewParticipants
                                postId={post.postId}
                                slot={thisSlot}
                                isCustom={isCustom}
                                />
                                <Typography variant="body2" color="textSecondary" variant='block'>
                                    │
                                </Typography>   
                            </Fragment>     
                        )} */}
                        {deleteButton}

                    </CardContent>
                </Card>
            </Grow>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Slot));

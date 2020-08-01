import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Util/Components
import UtilButton from '../util/UtilButton';
import UtilLocationPicker from '../util/UtilLocationPicker';
import TimePicker from 'react-time-picker';

// Redux
import { connect } from 'react-redux';
import { editSlot, clearErrors } from '../redux/actions/dataActions';
import { clearLocation } from '../redux/actions/userActions';

// Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    submitButton: {
        position: 'relative',
        margin: '15px 0 15px 0'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '2%'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    titleTextField: {
        margin: '0px auto 10px auto'
    },
    label: {
        marginBottom: 10
    },
    locationPicker: {
        margin: '10px auto 10px auto'
    },
    cancel: {
        marginLeft: 20,
        color: '#ff605C'
    },
    progressSpinner: {
        position: 'absolute'
      },
}

class EditSlot extends Component{
    state = {
        open: false,
        capacity: null,
        startTime: null,
        endTime: null,
        errors: []
    }
    handleClose = () => {
        this.setState({ 
            open: false,
            capacity: this.props.data.post.defaultCapacity,
            startTime: null,
            endTime: null,
            errors: []
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(
            !nextProps.UI.errors &&
            !nextProps.UI.loading
        ){
            this.handleClose();
        }
    }
    timeToString = (totalMinutes) => {
        var hour = 0
        if (totalMinutes < 600) {
            hour = '0' + parseInt(totalMinutes/60)
        }
        else {
            hour = parseInt(totalMinutes/60)
        }
        var minutes = totalMinutes % 60
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        return hour + ':' + minutes
    }
    mapSlotToState = (slot) => {
        var startTime = this.timeToString(slot.startTime)
        var endTime = this.timeToString(slot.endTime)
        this.setState({
            capacity: slot.capacity,
            startTime: startTime,
            endTime: endTime,
        })
    }
    handleOpen = () => {
        this.setState({ open: true, errors: [] })
        this.mapSlotToState(this.props.slot)
    }
    handleChangeCapacity = (event) => {
        this.setState({
            capacity: parseInt(event.target.value),
        })
    }
    handleChangeStartTime = time => {
        this.setState({ 
            startTime: time,
        })
    }
    handleChangeEndTime = time => {
        this.setState({ 
            endTime: time,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        var startHour = parseInt(this.state.startTime.substring(0, 2))
        var startMin = parseInt(this.state.startTime.substring(3))
        var newStartTime = startHour * 60 + startMin
        var endHour = parseInt(this.state.endTime.substring(0, 2))
        var endMin = parseInt(this.state.endTime.substring(3))
        var newEndTime = endHour * 60 + endMin
        if (newStartTime < newEndTime){
            const newSlot = {
                capacity: this.state.capacity,
                startTime: newStartTime,
                endTime: newEndTime,
                dayNumber: this.props.data.dayNumber,
                isCustom: true
            }
            console.log(newSlot)
            this.props.editSlot(
                this.props.data.post.postId, 
                this.props.slot.slotId, 
                newSlot, 
                this.props.data.dayNumber,
                this.props.isCustom
            )
        }
        else{
            this.setState({
                errors: {
                    time: 'invalidTime'
                }
            })
        }
        
    }
    render() {
        const { errors } = this.state;
        const { classes, data: { loading, post } } = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleOpen}>
                    Edit Slot
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <UtilButton tip="Cancel" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </UtilButton>
                    <DialogTitle>Edit slot</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <Typography variant="body1" color="textSecondary" className={classes.dateTimeTitle}>
                                Start time *
                            </Typography>
                            <TimePicker
                            onChange={this.handleChangeStartTime}
                            value={this.state.startTime}
                            className={classes.dateTimePicker}
                            hourPlaceholder='00'
                            minutePlaceholder='00'
                            disableClock
                            required
                            />
                            <Typography variant="body1" color="textSecondary" className={classes.dateTimeTitle}>
                                End time *
                            </Typography>
                            <TimePicker
                            onChange={this.handleChangeEndTime}
                            value={this.state.endTime}
                            className={classes.dateTimePicker}
                            hourPlaceholder='00'
                            minutePlaceholder='00'
                            disableClock
                            required	
                            />
                            {errors.time && (
                                <Typography variant="subtitle1" color="error">
                                    Invalid times
                                </Typography>
                            )}
                            <TextField
                            label="Capacity"
                            type="number"
                            name="capacity"
                            fullWidth
                            onChange={this.handleChangeCapacity}
                            error={errors.capacity ? true : false}
                            helperText={errors.capacity}
                            className={classes.textField}
                            value={this.state.capacity}
                            required
                            />
                            {(errors.length !== 0) && (
                                <Typography variant="subtitle1" color="error">
                                    Error submitting
                                </Typography>
                            )}
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress
                                    size={20}
                                    className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                            <Button variant="contained" variant="text" size="small" disabled={loading}
                            className={classes.cancel} onClick={this.handleClose}>
                                Cancel
                            </Button>                            
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

EditSlot.propTypes = {
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    editSlot,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditSlot))

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Util/Components
import UtilButton from '../util/UtilButton';
import UtilButtonFab from '../util/UtilButtonFab';

// Redux
import { connect } from 'react-redux';
import { createSlot } from '../redux/actions/dataActions';

// Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade'

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

class CreateSlot extends Component{
    state = {
        open: false,
        capacity: this.props.data.post.defaultCapacity,
        startTime: '00:00',
        endTime: '00:00',
        errors: []
    }
    handleClose = () => {
        this.setState({ 
            open: false,
            capacity: this.props.data.post.defaultCapacity,
            startTime: '00:00',
            endTime: '00:00',
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
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleChangeCapacity = (event) => {
        this.setState({
            capacity: parseInt(event.target.value),
        })
    }
    handleChangeStartTime = (event) => {
        this.setState({ 
            startTime: event.target.value,
        })
    }
    handleChangeEndTime = (event) => {
        this.setState({ 
            endTime: event.target.value,
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
        console.log(this.state.startTime)
        if (newStartTime < newEndTime){
            const newSlot = {
                capacity: this.state.capacity,
                startTime: newStartTime,
                endTime: newEndTime,
                dayNumber: this.props.data.dayNumber,
                isCustom: this.props.isCustom
            }
            console.log(newSlot)
            this.props.createSlot(
                this.props.data.post.postId, 
                newSlot, 
                this.props.data.dayNumber, 
                this.props.isCustom, 
                this.props.history
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
                <UtilButtonFab onClick={this.handleOpen} tip="Add a new slot" color='primary'>
                    <Fade in={true} timeout={1000}>
                        <AddIcon fontSize="large"/>
                    </Fade>
                </UtilButtonFab>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <UtilButton tip="Cancel" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </UtilButton>
                    <DialogTitle>Add a new slot</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            label="Start time *"
                            value={this.state.startTime}
                            onChange={this.handleChangeStartTime}
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            required
                            />
                            <br/>
                            <TextField
                            label="End time *"
                            value={this.state.endTime}
                            onChange={this.handleChangeEndTime}
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
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
                            defaultValue={post['defaultCapacity']}
                            required
                            />
                            {errors.length !== 0 && (
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

CreateSlot.propTypes = {
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    createSlot
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateSlot))

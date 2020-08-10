import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Util/Components
import UtilButton from '../util/UtilButton';

// Redux
import { connect } from 'react-redux';

// Mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import PeopleIcon from '@material-ui/icons/People';

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
    peopleIcon: {
        color: '#228B22'
    },
    doneButton: {
        position: 'relative',
        margin: '15px 0 15px 0'
    },
}

class ViewParticipants extends Component{
    state = {
        open: false,
        errors: [],
        participants: []
    }
    handleClose = () => {
        this.setState({ 
            open: false,
            errors: [],
            participants: []
        })
    }
    componentWillReceiveProps(nextProps){
        // if(nextProps.UI.errors){
        //     this.setState({
        //         errors: nextProps.UI.errors
        //     })
        // }
        // if(
        //     !nextProps.UI.errors &&
        //     !nextProps.UI.loading
        // ){
        //     this.handleClose();
        // }
    }
    // mapSlotToState = (slot) => {
    //     var startTime = this.timeToString(slot.startTime)
    //     var endTime = this.timeToString(slot.endTime)
    //     this.setState({
    //         capacity: slot.capacity,
    //         startTime: startTime,
    //         endTime: endTime,
    //     })
    // }
    handleOpen = () => {
        this.setState({ open: true, errors: [] })
        // this.mapSlotToState(this.props.slot)
    }
    render() {
        const { classes, data } = this.props;
        return (
            <Fragment>
                <UtilButton tip='View Participants' onClick={this.handleOpen}>
                    <PeopleIcon className={classes.peopleIcon}/>
                </UtilButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <UtilButton tip="Done" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </UtilButton>
                    <DialogTitle>Participants</DialogTitle>
                    <DialogContent>
                        <List>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Josh Lorincz"/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Jonny Chang"/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Rbad"/>
                            </ListItem>
                            <Divider/>
                        </List>
                        <Button
                        variant="contained"
                        color="primary"
                        className={classes.doneButton}
                        onClick={this.handleClose}
                        >
                            Done
                        </Button>                            
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ViewParticipants.propTypes = {
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ViewParticipants))

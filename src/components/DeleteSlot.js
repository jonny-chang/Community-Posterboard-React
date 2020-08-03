import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/UtilButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteSlot } from '../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'relative',
  },
  deleteOutline: {
      color: '#d11a2a',
  },
  confirmDelete: {
      color: '#d11a2a',
  }
};

class DeleteSlot extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteSlot = () => {
      this.props.deleteSlot(
        this.props.postId, 
        this.props.slotId, 
        this.props.data.dayNumber, 
        this.props.isCustom,
        this.props.history
      )
      this.setState({ open: false });    
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Slot"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline className={classes.deleteOutline}/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this slot?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteSlot} className={classes.confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteSlot.propTypes = {
  deleteSlot: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { deleteSlot })(withStyles(styles)(DeleteSlot));

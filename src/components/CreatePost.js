import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Util/Components
import UtilButton from '../util/UtilButton';
import UtilLocationPicker from '../util/UtilLocationPicker';

// Redux
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/dataActions';

// Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgess from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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
        top: '5%'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    label: {
        marginBottom: 10
    },
    locationPicker: {
        margin: '10px auto 10px auto'
    }
}

class CreatePost extends Component{
    state = {
        open: false,
        title: '',
        description: '',
        capacity: 0,
        address: '',
        errors: {}
    }
    handleClose = () => {
        this.setState({ open: false, errors: {}})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ 
                title: '',
                description: '',
                capacity: 0,
                address: ''
             });
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            title: this.state.title,
            description: this.state.description,
            defaultCapacity: this.state.capacity,
            locationString: this.state.locationString
        }
        this.props.createPost(newPost);
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <UtilButton onClick={this.handleOpen} tip="Create a post">
                    <AddIcon fontSize="large"/>
                </UtilButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <UtilButton tip="Cancel" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </UtilButton>
                    <DialogTitle>Create a new post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                            name="title"
                            type="text"
                            label="Title"
                            error={errors.title ? true : false}
                            helperText={errors.title}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <TextField 
                            name="description"
                            type="text"
                            label="Description"
                            error={errors.title ? true : false}
                            helperText={errors.title}
                            className={classes.textField}
                            onChange={this.handleChange}
                            multiline
                            fullWidth
                            />
                            <Typography variant="body1" color="textSecondary" className={classes.label}>
                                Location
                            </Typography>
                            <UtilLocationPicker className={classes.locationPicker}/>
                            <TextField 
                            name="address"
                            type="text"
                            label="Address"
                            error={errors.locationString ? true : false}
                            helperText={errors.locationString}
                            className={classes.textField}
                            onChange={this.handleChange}
                            multiline
                            fullWidth
                            />
                            <TextField
                            label="Capacity"
                            type="number"
                            name="capacity"
                            fullWidth
                            onChange={this.handleChange}
                            error={errors.defaultCapacity ? true : false}
                            helperText={errors.defaultCapacity}
                            className={classes.textField}
                            />
                            <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading}>
                                Post
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { createPost })(withStyles(styles)(CreatePost))

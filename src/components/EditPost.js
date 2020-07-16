import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Util/Components
import UtilButton from '../util/UtilButton';
import UtilLocationPicker from '../util/UtilLocationPicker';

// Redux
import { connect } from 'react-redux';
import { editPost } from '../redux/actions/dataActions';
import { clearLocation, setLocation } from '../redux/actions/userActions';


// Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
        top: '2%'
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

class EditPost extends Component{
    state = {
        open: false,
        title: '',
        description: '',
        capacity: 0,
        address: '',
        position: {},
        errors: {}
    }
    handleClose = () => {
        this.setState({ open: false, errors: {}})
        this.props.clearLocation()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading && !nextProps.data.position){
            this.setState({
                title: '',
                description: '',
                capacity: 0,
                address: '',
                position: {},
             });
            this.handleClose();
        }
        if(nextProps.data.position){
            this.setState({
                position: nextProps.data.position
            })
        }
    }
    componentDidMount(){
        const { post } = this.props;
        mapPostToState(post);
    }
    mapPostToState = (post) => {
        this.setState({
            title: post.title,
            description: post.description,
            capacity: post.capacity,
            address: post.address,
            position: post.position,
        })
        this.props.setLocation(this.state.posiion)
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            errors: {}
        })
        const newPost = {
            title: this.state.title,
            description: this.state.description,
            position: this.state.position,
            locationString: this.state.address,
            defaultCapacity: this.state.capacity
        }
        this.props.editPost(newPost);
        console.log(newPost)
    }
    render() {
        const { errors } = this.state;
        const { 
            classes, 
            UI: { loading }, 
            data: { post: { title, description, position, address, capacity } } 
        } = this.props;
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
                            value={this.state.title}
                            fullWidth
                            required
                            />
                            <TextField 
                            name="description"
                            type="text"
                            label="Description"
                            error={errors.description ? true : false}
                            helperText={errors.description}
                            className={classes.textField}
                            onChange={this.handleChange}
                            value={this.state.description}
                            multiline
                            fullWidth
                            required
                            />
                            <Typography variant="body1" color="textSecondary" className={classes.label}>
                                Location *
                            </Typography>
                            <UtilLocationPicker className={classes.position}/>
                            <TextField 
                            name="address"
                            type="text"
                            label="Address"
                            error={errors.locationString ? true : false}
                            helperText={errors.locationString}
                            className={classes.textField}
                            onChange={this.handleChange}
                            value={this.state.address}
                            multiline
                            fullWidth
                            required
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
                            value={this.state.capacity}
                            required
                            />
                            <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading}>
                                Save Changes
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

EditPost.propTypes = {
    editPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    clearLocation,
    setLocation,
    editPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditPost))

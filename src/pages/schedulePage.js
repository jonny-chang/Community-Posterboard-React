import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect, Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// Components
import Schedule from '../components/Schedule';

// Mui
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { 
    getPost, 
    clearPost, 
    getCurrentSlots, 
    clearCurrentSlots, 
    clearDayNumber,
    loadData, 
} from '../redux/actions/dataActions';

const styles = {
    backButton: {
        marginTop: '10px',
    },
    loadingContainer: {
        marginTop: 20,
        height: 100,
        width: 'auto',
        textAlign: 'center',
    },
    loadingIndicator: {
      position: 'relative',
      top: '20px',
    },
    noSlots: {
        marginTop: 20,
        textAlign: 'center'
    }
}

class schedulePage extends Component {
    state = {

    };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.loadData();
        this.props.getPost(postId);
    }
    componentWillUnmount(){
        this.props.clearCurrentSlots();
        this.props.clearDayNumber();
        this.props.clearPost();
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.data.post.postId !== this.props.data.post.postId) {
            this.props.getCurrentSlots(nextProps.data.post.postId, this.props.data.dayNumber)
        }
    }
    render() {
        const { classes, data: { post, loading, currentSlots }} = this.props
        let scheduleMarkup = !loading ? (
            (currentSlots.slots && currentSlots.slots.length > 0) ? (
                currentSlots.slots.map((slots) => <Schedule slots={slots}/>)    
            ) : (
                <Typography variant='h6' className={classes.noSlots}>
                    No slots currently
                </Typography>
            )
          ) : (
            <div className={classes.loadingContainer}>
                <CircularProgress size={40} className={classes.loadingIndicator}/>                
            </div>
          );
        return (
            
            <Grid container spacing={3}>
            <Grid item xs={3}>
                <Button 
                component={Link} 
                to="/" 
                className={classes.backButton} 
                variant='outlined' 
                color='inherit'
                >
                    Back
                </Button>
            </Grid>   
            <Grid item xs={6} sm={6}>
                {scheduleMarkup}
            </Grid>
            <Grid item xs={3}/>
        </Grid>
        );
    }
}

schedulePage.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps = {
    getPost,
    clearPost,
    getCurrentSlots,
    clearCurrentSlots,
    clearDayNumber,
    loadData
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(schedulePage));
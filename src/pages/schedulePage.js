import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect, Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import DateTimePicker from 'react-datetime-picker';

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
    getSlots, 
    clearSlots, 
    clearDayNumber,
    loadData
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
    },
    date: {
        marginTop: 10,
        textAlign: 'center'
    },
    dateTimePicker: {
        marginTop: 10
    },
    dateTimeTitle: {
        marginTop: 10
    },
    dateButtonContainer: {
        marginTop: 10,
    },
    dateButton: {
        color: '#228B22'
    }
}

class schedulePage extends Component {
    state = {
        pickerDate: null,
        isDate: false,
        date: null
    };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.loadData();
        this.props.getPost(postId);
    }
    componentWillUnmount(){
        this.props.clearSlots();
        this.props.clearDayNumber();
        this.props.clearPost();
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.data.post.postId !== this.props.data.post.postId) {
            this.props.getSlots(nextProps.data.post.postId, this.props.data.dayNumber)
        }
        if (nextProps.data.dayNumber !== this.props.data.dayNumber){
            console.log('Set new date now')
        }
    }
    onChange = date => {
        if (date){
            this.setState({ 
                pickerDate: date,
                isDate: true
            })
        }
        else {
            this.setState({ 
                pickerDate: date,
                isDate: false
            })
        }
        
    }
    handleDateChange = (event) => {
        const millisecondsPerDay = 86400000;
        var timeStamp = this.state.pickerDate;
        var dayNumber = Math.floor(timeStamp/millisecondsPerDay)
        this.props.getSlots(this.props.data.post.postId, dayNumber)
    }
    render() {
        console.log(this.state.date)
        const { classes, data: { post, loading, currentSlots }} = this.props
        const { pickerDate, isDate } = this.state
        let scheduleMarkup = !loading ? (
            (currentSlots.slots && currentSlots.slots.length > 0) ? (
                currentSlots.slots.map((slots) => <Schedule slots={slots}/>)    
            ) : (
                <Typography variant='body1' className={classes.noSlots}>
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
            <Grid item xs={3}>
                <Typography variant='h6' className={classes.dateTimeTitle}>
                    Select date
                </Typography>
                <DateTimePicker
                onChange={this.onChange}
                value={this.state.pickerDate}
                className={classes.dateTimePicker}
                format="yyyy-MM-dd"	
                />
                {isDate && (
                    <div className={classes.dateButtonContainer}>
                        <Button 
                        variant='outlined' 
                        className={classes.dateButton} 
                        size='small'
                        onClick={this.handleDateChange}
                        >
                            Go to date
                        </Button>
                    </div>
                )}
            </Grid>
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
    getSlots,
    clearSlots,
    clearDayNumber,
    loadData,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(schedulePage));
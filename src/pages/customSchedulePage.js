import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import DateTimePicker from 'react-datetime-picker';

// Components
import Schedule from '../components/Schedule';
import CreateCustomSlot from '../components/CreateCustomSlot';

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
    dateHeader: {
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
    },
    addButton: {
        textAlign: 'center',
        marginTop: 20
    }
}

class customSchedulePage extends Component {
    state = {
        pickerDate: null,
        isDate: false,
        currentDate: null
    };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.loadData();
        this.props.getPost(postId);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        this.setState({
            currentDate: today
        })
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
        var currentDate = (timeStamp.getMonth() + 1) + '/' + timeStamp.getDate() + '/' + (timeStamp.getYear() + 1900)
        this.setState({
            currentDate: currentDate
        })
        var dayNumber = Math.floor(timeStamp/millisecondsPerDay)
        this.props.getSlots(this.props.data.post.postId, dayNumber)
    }
    render() {
        const { classes, data: { post, loading, currentSlots, dayNumber }} = this.props
        const { pickerDate, isDate, currentDate } = this.state
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
        let customDatePicker = !loading ? (
            <Fragment>
                <Typography variant='h6' className={classes.dateTimeTitle}>
                    Select date
                </Typography>
                <DateTimePicker
                onChange={this.onChange}
                value={this.state.pickerDate}
                className={classes.dateTimePicker}
                format="yyyy-MM-dd"	
                />
                </Fragment>
        ) : (
            <div/>
        )
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
                <Typography variant='h5' className={classes.dateHeader}>
                    {currentDate}
                </Typography>
                {scheduleMarkup}
                {!loading && (
                    <div className={classes.addButton}>
                        <CreateCustomSlot/>
                    </div>
                )}
            </Grid>
            <Grid item xs={3}>
                {customDatePicker}
                {(isDate && !loading) && (
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

customSchedulePage.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(customSchedulePage));
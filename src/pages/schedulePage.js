import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import DateTimePicker from 'react-datetime-picker';

// Components
import Slot from '../components/Slot';
import CreateSlot from '../components/CreateSlot';

// Mui
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import MuiAlert from '@material-ui/lab/Alert';

// Redux
import { connect } from 'react-redux';
import { 
    getCustomPost, 
    clearPost, 
    getSlots, 
    clearSlots, 
    setDayNumber,
    loadData,
    getDefaultPost,
    setGetErrors
} from '../redux/actions/dataActions';

const styles = {
    backButton: {
        marginTop: '25px',
        marginLeft: '15px'
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
        marginTop: 20,
        textAlign: 'center'
    },
    dateTimePicker: {
        marginBottom: 10
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
    },
    noSlotsContainer: {
        textAlign: 'center'
    },
    paper: {
        padding: 20,
        marginTop: 20
    },
    titleContainer: {
        marginTop: 10,
    },
    defaultTitleContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    root: {
        flexGrow: 1,
        marginTop: 10
      },
    dateTimeContainer: {

    },
    formControl: {
        marginTop: 15
    },
    linearProgress: {
        marginTop: 45
    },
    copyright: {
        position: 'fixed',
        bottom: '10px',
        left: '12px',
    },
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class customSchedulePage extends Component {
    state = {
        pickerDate: null,
        isDate: false,
        currentDate: null,
        custom: null,
        value: 1,
        dayNumber: 3,
        collapse: false
    };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId,
            collapse: true
        })        
        this.props.loadData();
        this.props.setDayNumber(3);
        this.props.getDefaultPost(postId, this.props.history);
    }
    componentWillReceiveProps(nextProps){
        if (this.state.value === 2){
            const { data: { post: { postId, customDays }}} = this.props
            if (Array.isArray(customDays)){
                if (nextProps.data.dayNumber !== this.props.data.dayNumber){
                    this.props.getSlots(postId, nextProps.data.dayNumber, customDays.includes(nextProps.data.dayNumber))
                    this.setState({
                        custom: customDays.includes(nextProps.data.dayNumber)
                    })
                }
            }
            if(Array.isArray(nextProps.data.post.customDays)){
                if (nextProps.data.post.customDays !== this.props.data.post.customDays){
                    const { data: { dayNumber }} = this.props
                    this.props.getSlots(nextProps.data.post.postId, dayNumber, nextProps.data.post.customDays.includes(dayNumber))
                    this.setState({
                        custom: nextProps.data.post.customDays.includes(dayNumber)
                    })
                }
            }
        }
        if (this.state.value === 1){
            if (nextProps.data.dayNumber !== this.props.data.dayNumber) {
                const postId = this.props.match.params.postId;
                this.props.getSlots(postId, nextProps.data.dayNumber, false)
            }
        }
    }
    componentWillUnmount(){
        this.props.clearSlots();
        this.props.setDayNumber(null);
        this.props.clearPost();
        this.props.setGetErrors(false, 'post');
        this.props.setGetErrors(false, 'slot');
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
        if (newValue === 1) {
            const postId = this.props.match.params.postId;
            this.setState({
                postId: postId
            })        
            this.props.loadData();
            this.props.setDayNumber(3);
            this.props.getDefaultPost(postId, this.props.history);
        }
        if (newValue === 2) {
            const postId = this.props.match.params.postId;
            this.props.loadData();
            var today = new Date();
            today = (today.toDateString())
            this.setState({
                currentDate: today
            })
            this.props.getCustomPost(postId, this.props.history);
            const millisecondsPerDay = 86400000;
            var offset = new Date().getTimezoneOffset()
            var offset = new Date()
            offset = offset.getTimezoneOffset() * 60000;
            var timeStamp = Date.now() - offset;
            var dayNumber = Math.floor(timeStamp/millisecondsPerDay);
            }
      };
    onChange = date => {
        if (date){
            this.setState({ 
                pickerDate: date,
                isDate: true
            })
            this.handleDateChange(date)
        }
        else {
            this.setState({ 
                pickerDate: date,
                isDate: false
            })
        }
        
    }
    handleDateChange = (pickerDate) => {
        const millisecondsPerDay = 86400000;
        var timeStamp = pickerDate;
        var currentDate = (timeStamp.toDateString())
        this.setState({
            currentDate: currentDate
        })
        var dayNumber = Math.floor(timeStamp/millisecondsPerDay)
        this.props.setDayNumber(dayNumber)
    }
    handleChangeDropdown = (event) => {
        this.setState({
            dayNumber: event.target.value
        })
        this.props.setDayNumber(event.target.value)
    }
    dayNumberToString = (dayNumber) => {
        switch (dayNumber){
            case 0:
                return 'Thursday'
            case 1:
                return 'Friday'
            case 2:
                return 'Saturday'
            case 3:
                return 'Sunday'
            case 4:
                return 'Monday'
            case 5:
                return 'Tuesday'
            case 6:
                return 'Wednesday'
        }
    }
    render() {
        const { classes, 
            data: { 
                post, 
                loading, 
                currentSlots: { slots }, 
                dayNumber,
                loadingName,
                getPostError,
                getSlotError 
            }} = this.props
        const { currentDate, value } = this.state
        var dayNumberString = this.dayNumberToString(dayNumber)
        let customDatePicker = !loading ? (
            <div className={classes.dateTimeContainer}>
                <div className={classes.dateTimeTitle}>
                    <Typography variant='button' className={classes.dateTimeTitle}>
                        Select date
                    </Typography>
                </div>
                <DateTimePicker
                onChange={this.onChange}
                value={this.state.pickerDate}
                className={classes.dateTimePicker}
                format="yyyy-MM-dd"
                />
            </div>
        ) : (
            null
        )
        let dropdown = !loading ? (
            <FormControl className={classes.formControl}>
                <InputLabel>Day</InputLabel>
                <Select
                onChange={this.handleChangeDropdown}
                value={this.state.dayNumber}
                >
                <MenuItem value={3}>Sunday</MenuItem>
                <MenuItem value={4}>Monday</MenuItem>
                <MenuItem value={5}>Tuesday</MenuItem>
                <MenuItem value={6}>Wednesday</MenuItem>
                <MenuItem value={0}>Thursday</MenuItem>
                <MenuItem value={1}>Friday</MenuItem>
                <MenuItem value={2}>Saturday</MenuItem>
                </Select>
            </FormControl>
        ) : (
            null
        )
        let customTitleMarkup = !loadingName ? (
            <Fade in={true} timeout={2000}>
                <Grid container className={classes.titleContainer} justify='space-around'>
                    <Grid item xs={9}>
                        <Typography variant='overline'>
                            Schedule for
                        </Typography>
                        <Typography variant='h5'>
                            {post.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {customDatePicker}
                    </Grid>
                </Grid>
            </Fade>
        ) : (
            <Grid container className={classes.defaultTitleContainer} justify='space-around'>
                <Grid item xs={5}>
                    <div className={classes.linearProgress}>
                        <LinearProgress/>
                    </div>
                </Grid>
                <Grid item xs={5}/>
                <Grid item xs={2}>
                    <div className={classes.linearProgress}>
                        <LinearProgress/>
                    </div>
                </Grid>
            </Grid>
        )
        let defaultTitleMarkup = !loadingName ? (
            <Fade in={true} timeout={2000}>
                <Grid container className={classes.defaultTitleContainer} justify='space-around'>
                    <Grid item xs={10}>
                        <Typography variant='overline'>
                            Schedule for
                        </Typography>
                        <Typography variant='h5'>
                            {post.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {dropdown}
                    </Grid>
                </Grid>
            </Fade>
        ) : (
            <Grid container className={classes.defaultTitleContainer} justify='space-around'>
                <Grid item xs={5}>
                    <div className={classes.linearProgress}>
                        <LinearProgress/>
                    </div>
                </Grid>
                <Grid item xs={5}/>
                <Grid item xs={2}>
                    <div className={classes.linearProgress}>
                        <LinearProgress/>
                    </div>
                </Grid>
            </Grid>
        )
        let scheduleMarkup = !loading ? (
            (slots && slots.length > 0) ? (
                slots.map((slots) => 
                <Slot thisSlot={slots} isCustom={this.state.custom} 
                key={slots.slotId} view='custom'/>)    
            ) : (
                <div className={classes.noSlotsContainer}>
                    <Typography variant='body1' className={classes.noSlots}>
                        No slots currently for this day
                    </Typography>
                </div>
                
            )
          ) : (
            <div className={classes.loadingContainer}>
                <CircularProgress size={50} className={classes.loadingIndicator}/>                
            </div>
          );
          let defaultScheduleMarkup = !loading ? (
            (slots && slots.length > 0) ? (
                slots.map((slots) => 
                <Slot thisSlot={slots} isCustom={false} 
                key={slots.slotId} view='default'/>)    
            ) : (
                <div className={classes.noSlotsContainer}>
                    <Typography variant='body1' className={classes.noSlots}>
                        No slots currently for this day
                    </Typography>
                </div>
                
            )
          ) : (
            <div className={classes.loadingContainer}>
                <CircularProgress size={50} className={classes.loadingIndicator}/>                
            </div>
          );
        return (
            <Fragment>
                {(getPostError) && (
                    <Alert severity="error">
                        There was an error retrieving your posts, please refresh the page
                    </Alert>
                )}
                {(getSlotError) && (
                    <Alert severity="error">
                        There was an error retrieving your slots, please refresh the page
                    </Alert>
                )}       
                {value === 1 && (
                    <Grid container spacing={3} className={classes.gridContainer} 
                    alignItems="flex-start" justify="flex-end" direction="row">
                        <Grid item xs={3}>
                                <Button 
                                component={Link} 
                                to='/'
                                className={classes.backButton} 
                                variant='outlined' 
                                color='inherit'
                                >
                                    Back
                                </Button>
                        </Grid>   
                        <Grid item xs={8} sm={8} className={classes.grid}> 
                            <Collapse in={this.state.collapse} timeout={1000}>    
                                <Paper className={classes.root}>
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Default Days" value={1} disabled={loading}/>
                                        <Tab label="Custom Days" value={2} disabled={loading}/>
                                    </Tabs>
                                </Paper>     
                            </Collapse>
                            {defaultTitleMarkup}
                            <Divider/>
                            {!loading && (
                                <Fragment>          
                                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                                        <Typography variant='h5' className={classes.dateHeader}>
                                            {dayNumberString}
                                        </Typography>
                                    </Slide>
                                </Fragment>
                            )}
                            {defaultScheduleMarkup}
                            {(!loading && !loadingName) && (
                                <div className={classes.addButton}>
                                    <CreateSlot isCustom={false}/>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                )}
                {value === 2 && (
                    <Grid container spacing={3} className={classes.gridContainer} 
                    alignItems="flex-start" justify="flex-end" direction="row">
                        <Grid item xs={3}>
                                <Button 
                                component={Link} 
                                to='/'
                                className={classes.backButton} 
                                variant='outlined' 
                                color='inherit'
                                >
                                    Back
                                </Button>
                        </Grid>   
                        <Grid item xs={8} sm={8} className={classes.grid}>     
                            <Paper className={classes.root}>
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    <Tab label="Default Days" value={1} disabled={loading}/>
                                    <Tab label="Custom Days" value={2} disabled={loading}/>
                                </Tabs>
                            </Paper>
                            {customTitleMarkup}
                            <Divider/>
                            {!loading && (
                                <Fragment>
                                      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
                                        <Typography variant='h5' className={classes.dateHeader}>
                                            {currentDate}
                                        </Typography>
                                      </Slide>
                                </Fragment>
                            )}
                            {scheduleMarkup}
                            {(!loading && !loadingName) && (
                                <div className={classes.addButton}>
                                    <CreateSlot isCustom={this.state.custom}/>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                )}
                <Typography variant='caption' className={classes.copyright}>
                    © Skipt 2020
                </Typography>                      
            </Fragment>          
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
    getCustomPost,
    clearPost,
    getSlots,
    clearSlots,
    setDayNumber,
    loadData,
    getDefaultPost,
    setGetErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(customSchedulePage));
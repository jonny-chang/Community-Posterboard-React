import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

// Redux
import { connect } from 'react-redux';
import { setWeekDayNumber } from '../redux/actions/dataActions';

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
    },
    noSlotsContainer: {
        textAlign: 'center'
    },
    formControl: {
        margin: 10,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: 20,
      }
}

class defaultSchedulePage extends Component {
    state = {
        postId: null,
        weekDayNumber: null
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId
        })
        this.props.setWeekDayNumber(3);
    }
    handleChange = (event) => {
        this.setState({
            weekDayNumber: event.target.value
        })
        this.props.setWeekDayNumber(event.target.value)
    }
    dayNumberToString = (weekDayNumber) => {
        switch (weekDayNumber){
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
        const { classes, data: { loading, weekDayNumber } } = this.props
        var dayNumberString = this.dayNumberToString(weekDayNumber)
        return (
            <Grid container spacing={3}>
            <Grid item xs={3}>
                {!loading && (
                    <Button 
                    component={Link} 
                    to={`/schedule/${this.state.postId}`}
                    className={classes.backButton} 
                    variant='outlined' 
                    color='inherit'
                    >
                        Back
                    </Button>
                )}
            </Grid>   
            <Grid item xs={6} sm={6}>
                <h1>{dayNumberString}</h1>
            </Grid>
            <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Day </InputLabel>
                    <Select
                    onChange={this.handleChange}
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
            </Grid>
        </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
  });
  
const mapActionsToProps = {
    setWeekDayNumber
}

  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(defaultSchedulePage));
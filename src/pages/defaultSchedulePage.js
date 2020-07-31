import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';

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
    }
}

class defaultSchedulePage extends Component {
    state = {
        postId: null
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId
        })
    }
    render() {
        const { classes, data: { loading } } = this.props
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
                <p>Default days</p>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
  });
  
  const mapActionsToProps = {

  }

  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(defaultSchedulePage));
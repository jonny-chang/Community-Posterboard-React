import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

// Redux
import { connect } from 'react-redux';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
    card: {
        display: 'flex',
        marginTop: 15,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    },
    title: {
        marginBottom: 10
    },
    description: {
        marginBottom: 5
    },
    capacity: {
        marginBottom: 5
    },
    address: {
        marginBottom: 5,
    },
    deleteContainer:{

    }
}

class Schedule extends Component {
    render() {
        const { classes, data: { post, dayNumber } } = this.props;
        return (
            <p>{this.props.slots}</p>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Schedule));

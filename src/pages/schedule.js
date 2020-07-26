import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect, Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// Mui
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getPost, clearPost } from '../redux/actions/dataActions';

const styles = {
    backButton: {
        marginTop: '10px',
    }
}

class schedule extends Component {
  state = {
    postId: '',
    result: {},
    forbidden: false,
  };
  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.props.getPost(postId);
    axios.get(`/post/${postId}/slots/`)
        .then((res) => {
            this.setState({
            postId: postId,  
            result: res.data
            });
            console.log(res)
        })
        .catch((err) => {
            console.log(err.response.data)
            this.setState({
                postId: postId
            })
            if (err.response.status === 403){
                this.setState({
                    forbidden: true
                })
            }
            });
  }
    handleBack = () => {
        this.props.clearPost();
    }
    render() {
        const { postId, result, forbidden } = this.state
        const { classes, data: { post, loading }} = this.props
        console.log(this.props.data.post)
        if (forbidden) {
            return(
                <Redirect to='/error'/>
            )
        }
        return (
            
            <Grid container spacing={3}>
            <Grid item xs={3}>
                <Button 
                component={Link} 
                to="/" 
                className={classes.backButton} 
                variant='outlined' 
                color='inherit'
                onClick={this.handleBack}
                >
                    Back
                </Button>
            </Grid>   
            <Grid item xs={6} sm={6}>
                <p>Schedule of {post.title}</p>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
        );
    }
}

schedule.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps = {
    getPost,
    clearPost
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(schedule));
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

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
  render() {
      const { postId, result, forbidden } = this.state
      if (forbidden) {
          return(
            <Redirect to='/forbidden'/>
          )
    }
    return (
        <Grid container spacing={3}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
            <p>Schedule of post {postId}</p>
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
    getPost
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(schedule);
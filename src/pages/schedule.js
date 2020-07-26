import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';

class schedule extends Component {
  state = {
    postId: '',
    result: {}
  };
  componentDidMount() {
    const postId = this.props.match.params.postId;
    axios
      .get(`/post/${postId}/slots`)
      .then((res) => {
        this.setState({
          postId: postId,
          result: res.data
        });
        console.log(postId + ' ' + res.data)
      })
      .catch((err) => console.log(err));
  }
  render() {
      const { postId, result } = this.state
    return (
      <p>Schedule</p>
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

}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(schedule);
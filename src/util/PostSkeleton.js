import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  card: {
    display: 'flex',
    marginTop: 20
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  progressSpinner: {
      position: 'absolute'
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
  }
};

const PostSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 1 }).map((item, index) => (
    // <Card className={classes.card} key={index}>
    //   <CardContent className={classes.cardContent}>
      <div className={classes.loadingContainer}>
        <CircularProgress size={40} className={classes.loadingIndicator}/>                
      </div>
    //   </CardContent>
    // </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);
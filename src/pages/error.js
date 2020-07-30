import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        textAlign: 'center'
    },
}

class error extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography variant='h4'>
                    Error, page does not exist
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(error)

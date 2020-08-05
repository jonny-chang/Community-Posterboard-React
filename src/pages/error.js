import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        textAlign: 'center',
        marginTop: 30
    },
}

class error extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography variant='h4'>
                    Error, the page you are looking for does not exist
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(error)

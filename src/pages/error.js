import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        textAlign: 'center',
        marginTop: 30
    },
    copyright: {
        position: 'fixed',
        bottom: '10px',
        left: '12px',
    },
}

class error extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <Typography variant='h4'>
                        Error, the page you are looking for does not exist
                    </Typography>
                </div>
                    <Typography variant='caption' className={classes.copyright}>
                    © Skipt 2020
                </Typography>
            </Fragment>
        )
    }
}

export default withStyles(styles)(error)

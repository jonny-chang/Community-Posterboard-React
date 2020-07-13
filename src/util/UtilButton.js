import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, tip, onClick, btnClassName, tipClassName, fontSize }) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName} fontSize={fontSize}>
            {children}
        </IconButton>
    </Tooltip>
)

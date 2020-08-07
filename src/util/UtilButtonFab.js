import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

export default ({ children, tip, onClick, btnClassName, tipClassName, fontSize, color }) => (
    <Tooltip title={tip} className={tipClassName}>
        <Fab onClick={onClick} className={btnClassName} fontSize={fontSize} color={color}>
            {children}
        </Fab>
    </Tooltip>
)

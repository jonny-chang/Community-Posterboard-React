import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// Mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Navbar extends Component {
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar className='nav-container'>
                    <h2>Community Posterboard</h2>
                </Toolbar>
            </AppBar>   
        )
    }
}

export default Navbar

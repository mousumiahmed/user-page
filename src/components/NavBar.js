import React, { Component } from 'react';
import {AppBar,Toolbar } from '@material-ui/core';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                 <AppBar  position="static" style={{ backgroundImage: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"}}>
                    <Toolbar >
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

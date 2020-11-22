import React from "react"
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../App.css'

function Header() {
    return(
        <AppBar position="static" color="default" elevation={0} className='AppBar'>
            <Toolbar >
                <Typography variant="h6" color="inherit" noWrap>
                    ElectiTBA
                </Typography>

            </Toolbar>
        </AppBar>
    )
}

export default Header


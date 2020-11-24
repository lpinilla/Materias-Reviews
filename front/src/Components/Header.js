import React from "react"
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../App.css'
import Link from "@material-ui/core/Link";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';


function Header() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <AppBar position="static" color="default" elevation={0} className='AppBar'>
            <Toolbar className="Toolbar">
                <Typography color="inherit" className="Logo">
                    ElectiTBA
                </Typography>
                {/*TOOD: si el usuario no esta login, no mostrar*/}

                <nav>
                    <Link variant="button" color="textPrimary" href="#" className="Link" onClick={handleClickOpen}>
                        Mi Usuario
                    </Link>
                    <Dialog open={open} onClose={handleClose}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Mis usuario </DialogTitle>
                        <DialogContent>
                            <TextField
                                id="name"
                                label="Nombre y Apellido"
                                defaultValue="User name"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                            <TextField
                                id="name"
                                label="Legajo"
                                defaultValue="User name"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </nav>
            </Toolbar>

        </AppBar>

    )
}

export default Header


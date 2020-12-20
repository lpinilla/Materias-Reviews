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
import { getHelloWorld, getUser } from "../services/apiService";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TableCell, TableRow } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";


function Header({ user, selectedUser, myFriends, handleSubmit, handleTextfieldChange, friendLegajo }) {
    //user profile
    const [open, setOpen] = React.useState(false);
    //add friend
    const [openAdd, setOpenAdd] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    if (user !== undefined)
        var usuario = user.usuario;



    return (
        <AppBar position="static" color="default" elevation={0} className='AppBar'>
            <Toolbar className="Toolbar">
                <Typography color="inherit" className="Logo">
                    ElectiTBA
                </Typography>
                {/*TOOD: si el usuario no esta login, no mostrar*/}

                <nav>
                    {usuario !== undefined ? (
                        <div>
                            <Link variant="button" color="textPrimary" href="#" className="Link"
                                onClick={handleClickOpen} >
                                Mi Usuario
                            </Link>
                            <Dialog open={open} onClose={handleClose}
                                aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Mi usuario </DialogTitle>
                                <DialogContent >
                                    <TextField style={{ padding: "6px 24px 6px 16px" }}
                                        id="name"
                                        label="Nombre y Apellido"
                                        defaultValue={usuario === undefined ? '' : usuario.nombre}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                    />
                                    <TextField style={{ padding: "6px 24px 6px 16px" }}
                                        id="id"
                                        label="Legajo"
                                        defaultValue={usuario === undefined ? '' : usuario.legajo}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                    />
                                    <TableContainer>
                                        <Table size="small" style={{ marginTop: "39px", borderTop: "dotted" }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: "bold" }}>Amigos</TableCell>
                                                    <TableCell style={{ textAlign: "right" }}>
                                                        <Button color="primary" onClick={handleClickOpenAdd}>
                                                            Añadir Amigo
                                                        </Button>
                                                        <Dialog open={openAdd} onClose={handleCloseAdd}
                                                            aria-labelledby="form-dialog-title">
                                                            <DialogTitle id="form-dialog-title">Añadir amigo </DialogTitle>
                                                            <DialogContent>
                                                                <TextField
                                                                    id="legajo"
                                                                    label="Legajo"
                                                                    value={friendLegajo}
                                                                    onChange={handleTextfieldChange}
                                                                    type={"text"}
                                                                    fullWidth
                                                                />
                                                            </DialogContent>
                                                            <Button onClick={handleSubmit} color="primary">
                                                                Añadir
                                                            </Button>
                                                        </Dialog>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {myFriends ? console.log(myFriends.data.amigos) : null}
                                                {myFriends ? myFriends.data.amigos.map(e => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell component="th" scope="row">
                                                                {e[0].nombre}
                                                            </TableCell>
                                                            <TableCell style={{ textAlign: "right" }}>
                                                                <Button color="primary">
                                                                    Eliminar
                                                        </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                    : null}

                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cerrar
                                    </Button>
                                </DialogActions>
                            </Dialog></div>) : (<div></div>)}


                </nav>
            </Toolbar>

        </AppBar>

    )
}

export default Header


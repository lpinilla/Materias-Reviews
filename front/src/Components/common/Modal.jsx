import React from 'react';
import {Dialog, DialogTitle, DialogActions, Button, DialogContent} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";


export default function Modal({open, handleClose, title, children, cancel,rateChange}) {

    return (
        <Dialog open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title} </DialogTitle>
            <DialogContent>
                {children ? (
                    <div>
                        <TextField
                            id="comment"
                            label="Comentarios"
                            defaultValue="Comentario"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                        <TextField
                            id="rate"
                            label="Puntaje"
                            defaultValue="Puntaje"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </div>
                ) : (<div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment"
                        label="Comentario"
                        type="text"
                        fullWidth
                    />
                    <form className="Form" noValidate>
                        <FormControl className="FormControl">
                            <InputLabel>Puntuacion</InputLabel>
                            <Select
                                autoFocus
                                onChange={rateChange}
                                inputProps={{
                                    name: 'rate',
                                    id: 'rate',
                                }}
                            >
                                <MenuItem value="1">Malo</MenuItem>
                                <MenuItem value="2">Regular</MenuItem>
                                <MenuItem value="3">Bueno</MenuItem>
                                <MenuItem value="4">Muy Bueno</MenuItem>
                                <MenuItem value="5">Excelente</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </div>)}

            </DialogContent>
            <DialogActions>
                {cancel ? (
                    <div>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Aceptar
                        </Button>
                    </div>
                ) : (

                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>


                )}

            </DialogActions>
        </Dialog>
    )
}

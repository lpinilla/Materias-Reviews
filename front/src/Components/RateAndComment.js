import React, {Component} from 'react';
import {Dialog, DialogTitle, DialogActions, Button, DialogContent} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";


export default class RateAndComment extends Component {

    constructor() {
        super();
    }

    render() {
        return (

            <Dialog open={this.props.open} onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Puntua y Comenta </DialogTitle>
                <DialogContent>
                    <div>
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
                                    onChange={this.props.rateChange}
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
                    </div>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Aceptar
                        </Button>
                    </div>

                </DialogActions>
            </Dialog>
        )
    }

}

import React from 'react'
import {
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
    DialogTitle,
    DialogContent,
    Dialog,
    DialogActions
} from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";


export default function ViewComments({ reviews, open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Comentarios </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Comentario</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}
                                    align="right">Puntaje</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}
                                    align="right">Autor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews === undefined ? null : reviews.map((e, idx) => {
                               return (
                                    <TableRow key={idx}>
                                        <TableCell component="th" scope="row">
                                            {e.comentario}
                                        </TableCell>
                                        <TableCell align="right">{e.rating? e.rating:e.puntaje}</TableCell>
                                        {/** TODO: agregar el nombre en vez del legajo */}
                                        {e.autor === undefined? null : <TableCell align="right">{e.autor}</TableCell>}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogActions>
                    <div>
                        <Button onClick={handleClose} color="primary">
                            Cerrar
                            </Button>
                    </div>

                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
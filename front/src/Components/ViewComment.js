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
import {deleteReview} from "../services/apiService";


export default function ViewComment({review, open, handleClose, user,refreshAll}) {

    async function deleteR() {
        console.log("entro")
        await deleteReview(review.referencia, {user_id: parseInt(user.usuario.legajo)}
        )
        // await refreshAll();
    }

    return (
        <Dialog open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Comentario </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>Comentario</TableCell>
                                <TableCell style={{fontWeight: "bold"}}
                                           align="right">Puntaje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {review === undefined ? null : review.comentario}
                                </TableCell>
                                <TableCell
                                    align="right">{review === undefined ? null : (review.rating ? review.rating : review.puntaje)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogActions>
                    <div>
                        {user.usuario !== undefined ?
                            <Button onClick={() => deleteR()} color="primary">
                                {/*<Button onClick={async () => {*/}
                                {/*    await deleteReview(review.referencia,{user_id:parseInt(user.usuario.legajo)}*/}
                                {/*    )}}  color="primary">*/}
                                Eliminar
                            </Button> : null}
                    </div>
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
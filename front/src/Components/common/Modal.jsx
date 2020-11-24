import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';

export default function Modal({ open, handleClose, title, children }) {
    return (
        <Dialog open={open} onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title} </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                                                    </Button>
                <Button onClick={handleClose} color="primary">
                    Aceptar
                                                    </Button>
            </DialogActions>
        </Dialog>
    )
}

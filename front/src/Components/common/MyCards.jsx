import React from 'react';
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import Modal from "./Modal";

export default function MyCards({open, handleOpen, handleClose, title, buttonText, cancel, children, inside}) {
    if(inside !== undefined)
        var { materias } = inside.courses;
    return (
        <Grid item xs={12} sm={6} md={4} className="Card">
            <Card align="top">
                <CardHeader
                    title={title}
                    titleTypographyProps={{align: 'center'}}
                    subheaderTypographyProps={{align: 'center'}} className="CardHeader"
                />
                <CardContent>
                    <Table size="small">
                        <TableBody>
                            {inside===undefined?null:materias.map((e, key) => {
                                    return(
                                        <TableRow key={key}>
                                            <TableCell>
                                                <Typography variant="h6" color="textSecondary" align="left">
                                                    {e.nombre}
                                                </Typography>
                                            </TableCell>
                                            {buttonText ? (
                                                <TableCell>
                                                    <Button className='Button' onClick={handleOpen}>
                                                        {buttonText}
                                                    </Button>
                                                    <Modal open={open} handleClose={handleClose} title={title} cancel={cancel} children={children}>
                                                    </Modal>
                                                </TableCell>
                                            ) : (<div></div>)}
                                        </TableRow>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                {/*<CardActions>*/}
                {/*    <Button fullWidth variant={tier.buttonVariant} color="primary">*/}
                {/*        {tier.buttonText}*/}
                {/*    </Button>*/}
                {/*</CardActions>*/}
            </Card>
        </Grid>
    )
}


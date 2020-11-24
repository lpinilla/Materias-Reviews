import React from "react";
import Card from "@material-ui/core/Card/Card";
import {
    CardContent,
    Typography,
    Button,
    Container,
    Grid,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core';
import Modal from './common/Modal';
import '../App.css';
import MyCards from "./common/MyCards";


function Cards() {

    const [open, setOpen] = React.useState(false);
    const [openCom, setOpenCom] = React.useState(false);
    const [openCour, setOpenCour] = React.useState(false);
    const [rate, setRate] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenCour(false);
        setOpenCom(false);
    };

    // const handleComClose = () => {
    //     setOpenCom(false);
    // };

    const handleComClickOpen = () => {
        setOpenCom(true);
    };

    // const handleCourClose = () => {
    //     setOpenCour(false);
    // };
    const handleCourClickOpen = () => {
        setOpenCour(true);
    };

    const handleRateChange = (event) => {
        setRate(event.target.value);
    };
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} className="Grid">
                <Grid item xs={12} sm={6} md={4} className="Card">
                    <Card align="top">
                        <CardHeader
                            title="Mis Materias"
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }} className="CardHeader"
                        />
                        <CardContent>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                hola
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button className='Button' onClick={handleCourClickOpen}>
                                                Rate and Comment
                                            </Button>
                                            <Modal open={openCour} handleClose={handleClose} title="Puntua y Comenta" cancel={true} children={false} rateChange={handleRateChange}>

                                            </Modal>
                                        </TableCell>
                                    </TableRow>
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
                {/*<MyCards open={openCour} handleOpen={handleCourClickOpen()} handleClose={handleClose()}*/}
                {/*         title="Mis Materias" write buttonText="Rate and Comment"/>*/}

                <MyCards open={open} title="Mis Materias Recomendadas"/>

                <MyCards open={openCom} handleOpen={handleComClickOpen} handleClose={handleClose}
                         title="Mis Comentarios" buttonText="Ver Comentarios" cancel={false} children={true}/>
                <MyCards open={open} handleOpen={handleClickOpen} handleClose={handleClose} title="Todas las Materias"
                         buttonText="Ver Comentarios" cancel={false} children={true}/>

            </Grid>
        </Container>
    )
}


export default Cards

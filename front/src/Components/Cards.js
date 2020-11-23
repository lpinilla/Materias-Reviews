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
    TableRow,
    TextField,
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select
} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from './common/Modal';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

function Cards() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [rate, setRate] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                                            <Button className='Button' onClick={handleClickOpen}>
                                                Rate and Comment
                                            </Button>
                                            <Modal open={open} handleClose={handleClose} title="Puntua y Comenta">
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="comment"
                                                    label="Comentario"
                                                    type="text"
                                                    fullWidth
                                                />
                                                <form className={classes.form} noValidate>
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel>Puntuacion</InputLabel>
                                                        <Select
                                                            autoFocus
                                                            onChange={handleRateChange}
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
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                            title="Mis Recomendaciones"
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }} className="CardHeader"
                        />
                        <CardContent>
                            <Table size="small">
                                <TableBody>
                                    {/*TODO: for con las materias*/}
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                Matematica
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                Simulacion de sistemas
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                Derecho
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
    )
}


const courses = [
    {
        names: ['Mate', 'Analisis', 'Blabla']
    }
];

export default Cards

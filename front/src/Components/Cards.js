import React from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import makeStyles from "@material-ui/core/styles/makeStyles";

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

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} className="Grid">
                <Grid item xs={12} sm={6} md={4} className="Card">
                    <Card align="top">
                        <CardHeader
                            title="Mis Materias"
                            titleTypographyProps={{align: 'center'}}
                            subheaderTypographyProps={{align: 'center'}} className="CardHeader"
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
                                            <Dialog open={open} onClose={handleClose}
                                                    aria-labelledby="form-dialog-title">
                                                <DialogTitle id="form-dialog-title">Puntua y Comenta </DialogTitle>
                                                <DialogContent>
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
                            titleTypographyProps={{align: 'center'}}
                            subheaderTypographyProps={{align: 'center'}} className="CardHeader"
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

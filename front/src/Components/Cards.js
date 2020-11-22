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

function Cards() {
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={5}  className="Grid">
                <Grid item xs={12} sm={6} md={4} className="Card">
                    <Card align="top" >
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
                                                holajaifwnfwemjpofj
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button className='Button' >
                                            Rate and Comment
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                hola
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button className='Button' >
                                                Rate and Comment
                                            </Button>
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

import React from 'react'
import { TextField } from "@material-ui/core" 
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';

export default function Login({legajo, handleChange, submitUser}) {
    return (
    <Container maxWidth="lg" component="main">
        <Grid container spacing={5}  className="Grid">
            <Grid item xs={12} sm={6} md={4} className="Card">
                <Card align="top" >
                    <CardHeader
                        title="Login"
                        titleTypographyProps={{align: 'center'}}
                        subheaderTypographyProps={{align: 'center'}} className="CardHeader"
                    />
                    <CardContent>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Legajo" 
                                            variant="outlined" 
                                            value={legajo}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className='Button' onClick={submitUser} >
                                            Ingresar
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
            </Grid>
        </Container>
    )
}
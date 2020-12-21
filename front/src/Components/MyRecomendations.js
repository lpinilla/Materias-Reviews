import React from 'react'
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid, TextField
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";


export default function MyRecomendations({ inside, onChange, minScore, searchRecomendations }) {

    function uniqueBy(arr, prop){
        const merged = [].concat.apply([], arr);
        return merged.reduce((a, d) => {
            if (!a.includes(d[prop])) { a.push(d[prop]); }
            return a;
        }, []);
    }

    const categories = uniqueBy(inside, 'nombre');
    return (

        <Grid item xs={12} sm={6} md={4} className="Card">
            <Card align="top">
                <CardHeader
                    title="Mis Materias Recomendadas"
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }} className="CardHeader"
                />

                <CardContent>
                    <Table size="small">
                        <TableBody>
                            <TableRow >
                                <TableCell style={{display:"flex",padding:0}}>
                                    <TextField
                                        onChange={onChange}
                                        id="id"
                                        label="Puntaje minimo"
                                        value={minScore}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button  className='Button'
                                             onClick={searchRecomendations}>Buscar</Button>
                                </TableCell>
                            </TableRow>
                            {inside === undefined ? null : categories.map((e,key) => {
                                    return (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                {e}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                            )}
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        </Grid>
    )
}


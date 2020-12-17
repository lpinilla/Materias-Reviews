import React from 'react'
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import { getAllReviews } from '../services/apiService';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";


export default function MyRecomendations({ inside }) {
    console.log("my recom",inside)
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
                            {inside === undefined ? null : inside.map((e, key) => {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <Typography variant="h6" color="textSecondary" align="left">
                                                {e.nombre}
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


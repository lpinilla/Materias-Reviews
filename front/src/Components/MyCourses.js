import React, {Component} from 'react';
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import {getAllReviews} from '../services/apiService';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import RateAndComment from "./RateAndComment";
import ViewComments from "./ViewComments";

export default class MyCourses extends Component {
    state = {
        modal: false,
    };
    constructor() {
        super();

    }
    renderCommentsForSubject = async (e) => {
        const {codigo} = e;
        this.setState({modal: true});
    };

    render() {
        return(
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
                                            Materia 1
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button className='Button' onClick={async () => {
                                            this.renderCommentsForSubject("1");}}>
                                            Rate and Comment
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <RateAndComment open={this.state.modal} handleClose={() => this.setState({modal: false})} />

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}
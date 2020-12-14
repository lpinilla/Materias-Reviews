import React, {Component, IntrinsicElements as classes} from 'react';
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import Modal from "./Modal";
import {getAllReviews} from '../../services/apiService';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import ViewComments from "../ViewComments";

export default class MyCards extends Component {
    state = {
        modal: false,
        payload: {
            codigo: '',
            nombre: '',
            creditos: ''
        },
        reviews: [],

    };

    constructor() {
        super();

    }

    renderCommentsForSubject = async (e) => {
        const {codigo} = e;
        const response = await getAllReviews(codigo);
        const {reviews} = response.data;
        this.setState({reviews: reviews, modal: true, payload: e});
    };

    render() {
        const {inside, title, buttonText, cancel, children} = this.props;
        return (
            <Grid item xs={12} sm={6} md={4} className="Card" >
                <Card align="top" style={{width:"max-content"}}>
                    <CardHeader
                        title={title}
                        titleTypographyProps={{align: 'center'}}
                        subheaderTypographyProps={{align: 'center'}} className="CardHeader"
                    />
                    <CardContent>
                        <Table size="small">
                            <TableBody>
                                {inside === undefined ? null : inside.courses.materias.map((e, key) => {
                                        return (
                                            <TableRow key={key}>
                                                <TableCell>
                                                    <Typography variant="h6" color="textSecondary" align="left">
                                                        {e.nombre}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Button className='Button' onClick={async () => {
                                                        this.renderCommentsForSubject(e);
                                                    }}>
                                                        Ver Comentarios
                                                    </Button>

                                                </TableCell>

                                            </TableRow>
                                        );
                                    }
                                )}
                                <ViewComments open={this.state.modal} handleClose={() => this.setState({modal: false})}
                                              data={this.state.payload} cancel={cancel} reviews={this.state.reviews}>
                                </ViewComments>
                            </TableBody>
                        </Table>
                    </CardContent>

                </Card>
            </Grid>
        )
    }
}


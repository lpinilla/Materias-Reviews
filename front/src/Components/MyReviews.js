import React, {Component} from 'react';
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import { getCourseByID} from '../services/apiService';
import ViewComment from "./ViewComment";

export default class MyReviews extends Component {
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
        this.setState({reviews: e, modal: true, payload: e});
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
                                {inside === undefined ? null : inside.map((e, key) => {
                                        return (
                                            <TableRow key={key}>
                                                <TableCell>
                                                    <Typography variant="h6" color="textSecondary" align="left">
                                                        {e.name}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Button className='Button' onClick={async () => {
                                                        this.renderCommentsForSubject(e);
                                                    }}>
                                                        Ver Comentario
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                )}
                                <ViewComment open={this.state.modal} handleClose={() => this.setState({modal: false})}
                                              data={this.state.payload} cancel={cancel} review={this.state.reviews}>
                                </ViewComment>
                            </TableBody>
                        </Table>
                    </CardContent>

                </Card>
            </Grid>
        )
    }
}


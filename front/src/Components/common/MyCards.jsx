import React, {Component, IntrinsicElements as classes} from 'react';
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import Modal from "./Modal";
import {getAllReviews,addReview, getUser} from '../../services/apiService';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import ViewComments from "../ViewComments";
import RateAndComment from '../RateAndComment';
export default class MyCards extends Component {
    state = {
        modal: false,
        payload: {
            codigo: '',
            nombre: '',
            creditos: ''
        },
        comment:'',
        rate:1,
        reviews: [],
        modalRate: false,
        selectedSubjet: null
    };

    constructor() {
        super();

    }

    renderCommentsForSubject = async (e) => {
        const {codigo} = e;
        const response = await getAllReviews(codigo);
        let {reviews} = response.data;
        reviews = await this.renderAuthorFromReview(reviews)
        console.log(reviews);
        this.setState({reviews: reviews, modal: true, payload: e});
    };

    renderAuthorFromReview = async (reviews) => {
        for (let index = 0; index < reviews.length; index++) {
            const element = await getUser(reviews[index].autor);
            console.log("aca", element)
            reviews[index].autor = element.data.usuario.nombre;
        }
        return reviews;
    }

    rateAndCommentSubject = async (e) => {
        this.setState({ modalRate: true, selectedSubjet: e });
    }
    submitRateAndComment = async () => {
        console.log("JE",this.state, this.props);
        const { rate, comment, selectedSubjet } = this.state;
        console.log( parseInt(this.props.user.legajo),rate,comment,selectedSubjet.codigo);
        const response = await addReview({
            user_id: parseInt(this.props.user.usuario.legajo),
            puntaje: rate,
            comentario: comment,
            codigo_materia: selectedSubjet.codigo
        });
        console.log(response)
        this.props.refreshAll();
        this.setState({ modalRate: false });

    }

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
                                                        {e.nombre}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Button className='Button' onClick={async () => {
                                                        this.rateAndCommentSubject(e);
                                                    }}>
                                                        Rate and comment
                                                    </Button>
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
                                <RateAndComment 
                                    open={this.state.modalRate} 
                                    rate={this.state.rate}
                                    comment={this.state.comment}
                                    handleSubmit={this.submitRateAndComment}
                                    handleClose={() => this.setState({ modalRate: false })} 
                                    rateChange={(e) => this.setState({ rate: e.target.value })}
                                    handleCommentChange={(e) => this.setState({ comment: e.target.value })}
                                />
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


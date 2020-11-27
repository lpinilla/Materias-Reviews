import React, {Component} from 'react';
import {
    Button,
    CardHeader,
    CardContent,
    Table, TableBody, TableRow, TableCell, Typography, Grid
} from '@material-ui/core';
import Card from "@material-ui/core/Card/Card";
import Modal from "./Modal";
import {getAllReviews} from '../../services/apiService';

export default class MyCards extends Component {
    //props: {open,handleOpen,handleClose,title, buttonText, cancel, children, inside}
    // if(inside !== undefined)
    //     var { materias } = inside.courses;
    
    state={
        modal:false,
        payload: {
            codigo:'',
            nombre:'',
            creditos:''
        },
        reviews:[]
    }

    
    // const [open, setOpen] = React.useState(false);

    // let state = {
    //     posts: [],
    //     open: false,
    //     selectedPost: null // Keep track of the selected post
    // };

    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // let onOpenModal = i => {
    //     this.setState({
    //         open: true,
    //         selectedPost: i // When a post is clicked, mark it as selected
    //     });
    // };
    //
    // let onCloseModal = () => {
    //     this.setState({ open: false });
    // };
    renderCommentsForSubject = async (e) => {
        const { codigo } = e;
        const response = await getAllReviews(codigo);
        console.log(response)
        const { reviews } = response.data;
        this.setState({ reviews:reviews, modal:true, payload:e });
    }

    // let { open } = this.state;
    render(){
        console.log(this.props);
        const { inside, title, buttonText, cancel, children } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4} className="Card">
                <Card align="top">
                    <CardHeader
                        title={title}
                        titleTypographyProps={{align: 'center'}}
                        subheaderTypographyProps={{align: 'center'}} className="CardHeader"
                    />
                    <CardContent>
                        <Table size="small">
                            <TableBody>
                                {inside===undefined?null:inside.courses.materias.map((e, key) => {
                                        return(
                                            <TableRow key={key}>
                                                <TableCell>
                                                    <Typography variant="h6" color="textSecondary" align="left">
                                                        {e.nombre}
                                                    </Typography>
                                                </TableCell>
                                                {buttonText ? (
                                                    <TableCell>
                                                        <Button className='Button' onClick={async () => {
                                                            this.renderCommentsForSubject(e);
                                                        }}>
                                                            {buttonText}
                                                        </Button>
                                                    </TableCell>
                                                ) : (<div></div>)}
                                            </TableRow>
                                        );
                                    }
                                )}
                                <Modal open={this.state.modal} handleClose={() => this.setState({ modal: false })} data={this.state.payload} cancel={cancel}>
                                    {this.state.reviews.map((e, idx) => {
                                        console.log(e);
                                        return(
                                            <div key={idx}>
                                                <div>
                                                    Comentario : {e.comentario}
                                                </div>
                                                <div>
                                                   Puntaje : {e.rating}
                                                </div>
                                            </div>)

                                    })}
                                </Modal>
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
        )
    }
}


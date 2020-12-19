import React from "react";
import Card from "@material-ui/core/Card/Card";
import {
    CardContent,
    Typography,
    Button,
    Container,
    Grid,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core';
import Modal from './common/Modal';
import '../App.css';
import MyCards from "./common/MyCards";
import RateAndComment from "./RateAndComment";
import ViewComments from "./ViewComments";
import MyRecomendations from "./MyRecomendations";
import MyCourses from "./MyCourses";
import MyReviews from "./MyReviews";


function Cards({courses,myCourses, myReviews, myRecom, user, refreshAll}) {

    const [open, setOpen] = React.useState(false);
    const [openCom, setOpenCom] = React.useState(false);
    const [openCour, setOpenCour] = React.useState(false);
    const [rate, setRate] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenCour(false);
        setOpenCom(false);
    };


    const handleComClickOpen = () => {
        setOpenCom(true);
    };
    const handleCourClickOpen = () => {
        setOpenCour(true);
    };

    console.log("cards",myReviews)
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} className="Grid">

{/*                <MyCourses open={openCour} handleOpen={handleCourClickOpen} handleClose={handleClose} inside={myCourses} rateChange={handleRateChange}/>
*/}
                <MyRecomendations  title="Mis Materias Recomendadas"   inside={myRecom}/>

                <MyReviews open={openCom} handleOpen={handleComClickOpen} handleClose={handleClose}
                         title="Mis Comentarios"  inside={myReviews} reviews={true}/>

                <MyCards refreshAll={refreshAll} user={user} title="Todas las materias" open ={open}  handleOpen={handleClickOpen} handleClose={handleClose} inside={courses.materias} />

            </Grid>
        </Container>

    )
}


export default Cards

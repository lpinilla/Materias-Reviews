import React from "react";
import {

    Container,
    Grid,

} from '@material-ui/core';
import '../App.css';
import MyCards from "./common/MyCards";
import MyRecomendations from "./MyRecomendations";
import MyReviews from "./MyReviews";
import {getCourseByID} from "../services/apiService";


function Cards({courses,myCourses, myReviews, myRecom, user, refreshAll, handleMinScoreChange, minScore, searchRecomendations}) {

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


    console.log("en cards",myReviews,courses)
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} className="Grid">

                <MyRecomendations onChange={handleMinScoreChange} minScore={minScore} searchRecomendations={searchRecomendations} title="Mis Materias Recomendadas" inside={myRecom}/>

                <MyReviews open={openCom} handleOpen={handleComClickOpen} handleClose={handleClose}
                         title="Mis Comentarios"  inside={myReviews.mis_reviews} reviews={true}/>

                <MyCards refreshAll={refreshAll} user={user} title="Todas las materias" open ={open}  handleOpen={handleClickOpen} handleClose={handleClose} inside={courses.materias} />
                
            </Grid>
        </Container>

    )
}


export default Cards

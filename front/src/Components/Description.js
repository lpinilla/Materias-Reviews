import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import '../App.css';


function Description() {
    return(
        <Container maxWidth="sm" component="main" className='Desc' >
            <Typography component="h1" align="center" gutterBottom className="Typography">
                ElectiTBA
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
                Elegi tus materias con confianza
            </Typography>
        </Container>
    )
}

export default Description
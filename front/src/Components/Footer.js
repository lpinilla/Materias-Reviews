import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from "react";

const footers = [
    {
        title: 'ElectiTBA',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

function Footer(props) {
    return (
        <Container maxWidth="md" component="footer" className={props.classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                {footers.map((footer) => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map((item) => (
                                <li key={item}>
                                    <Link href="#" variant="subtitle1" color="textSecondary">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                ))}
            </Grid>

        </Container>
    )

}

export default Footer
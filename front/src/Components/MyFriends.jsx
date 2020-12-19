import React, {Component} from 'react';
import {
    Grid, Card, CardHeader, Table, TableBody, CardContent, TableRow, TableCell, Typography, 
} from '@material-ui/core'
export default class MyFriends extends Component{
    state = {
        myFriends:[]
    }
    async componentDidMount(){
        console.log(this.props.user);
    }
    render(){
        console.log(this.props.user)
        return(
            <Grid item xs={12} sm={6} md={4} className="Card">
            <Card align="top">
                <CardHeader
                    title="Mis Amigos"
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }} className="CardHeader"
                />
                <CardContent>
                    <Table size="small">
                        <TableBody>
                            {this.state.myFriends.map((e, key) => {
                                console.log(e)
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
        );
    }
}
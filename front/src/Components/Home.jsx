import React, {Component} from 'react'
import Header from './Header';
import Description from './Description';
import Cards from './Cards';
import Login from './Login';
import {getAllCourses, getHelloWorld, getMyCourses, getMyReviews, getUser} from '../services/apiService';

export default class Home extends Component {
    state = {
        user_id: '',
        name: '',
        lastName: '',
        user: '',
        selectedUser: false,
        courses: [],
        myCourses: [],
        myReviews: [],
        myRecom: []
    }

    componentDidMount = async () => {
        const response = await getAllCourses();
        this.setState({courses: response.data});
        // const user = await getUser(this.state.user_id);
    }


    renderLogin = () => {
        const {selectedUser, user_id: legajo} = this.state;
        console.log("my reviews", this.state.myReviews)

        if (selectedUser) {
            return (
                <div>
                    <Cards courses={this.state.courses} myCourses={this.state.myCourses}
                           myReviews={this.state.myReviews} user={this.state.user}/>
                </div>
            );
        } else {
            return (
                <Login
                    value={legajo}
                    handleChange={(event) => {
                        const {value: user_id} = event.target;
                        this.setState({user_id: user_id});
                    }}
                    submitUser={async () => {
                        if (this.state.user_id !== "") {
                            this.setState({selectedUser: true});
                            const id = parseInt(this.state.user_id, 10);
                            const user = await getUser(id);
                            this.setState({user: user.data});
                            this.setState({myCourses:getMyCourses(this.state.user_id)});
                            this.setState({myReviews:getMyReviews(this.state.user_id)});

                        } else {

                            // const id = parseInt(this.state.user_id, 10);
                            // const user = await getUser(0);
                            this.setState({user: ''});
                        }
                    }}
                />

            );
        }
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} selectedUser={this.state.selectedUser}/>
                <Description/>

                {/*<Cards courses={this.state.courses}/>*/}
                {this.renderLogin()}


            </div>
        )
    }
}



        
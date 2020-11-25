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
        selectedUser: false,
        courses: [],
        myCourses:[],
        myReviews:[]
    }

    componentDidMount = async () => {
        const response = await getHelloWorld();
        const response1 = await getAllCourses();
        // const response2=await  getMyCourses();
        // const response3= await  getMyReviews();
        this.setState({courses: response1.data});
        // this.setState({myCourses: response2.data});
        // this.setState({myReviews:response3.data});

        console.log(this.state.courses);

    }


    renderLogin = () => {
        const {selectedUser, user_id: legajo} = this.state;
        if (selectedUser) {
            return (
                <div>
                    <Cards courses={this.state.courses} />
                </div>
            );
        } else {
            return (
                <Login
                    value={legajo}
                    handleChange={(event) => {
                        const {value: user_id} = event.target;
                        this.setState({user_id})
                    }}
                    submitUser={async () => {
                        this.setState({selectedUser: true});
                    }}
                />
            );
        }
    }


    render() {
        return (
            <div>

                <Header/>
                <Description/>
                {this.renderLogin()}

            </div>
        )
    }
}



        
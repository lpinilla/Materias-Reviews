import React, { Component } from 'react'
import Header from './Header';
import Description from './Description';
import Cards from './Cards';
import Login from './Login';
import {
    getAllCourses,
    getHelloWorld,
    getMyCourses,
    getMyReviews,
    getUser,
    getFriends,
    addFriend,
    getCourseByID
} from '../services/apiService';

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
        myFriends:[],
        myRecom: [],
        friendLegajo:''
    }

    componentDidMount = async () => {
        const response = await getAllCourses();
        this.setState({ courses: response.data });
        // const user = await getUser(this.state.user_id);
    }

    async  renderCourseName(r) {
        if(r!==undefined){
            for (let index = 0; index < r.mis_reviews.length; index++) {
                const element = await getCourseByID(r.mis_reviews[index].referencia);
                r.mis_reviews[index].name = element.data.materia.nombre;
            }
        }
        console.log("entro course",r)
        return r;
    }

    refreshAll = async () => {
        const { user_id } = this.state;
        const id = parseInt(user_id, 10);
        const { data: user } = await getUser(id);
        const myCourses = await getMyCourses(user_id);
        const myFriends = await getFriends(user_id);
        const myReviews = await getMyReviews(user_id);
        const reviews = await this.renderCourseName(myReviews.data);
        this.setState({ user, myCourses, myFriends });
        this.setState({myReviews:reviews});
        console.log("en refresh",reviews,this.state.myReviews);

    }

    renderLogin = () => {
        const { selectedUser, user_id: legajo } = this.state;

        if (selectedUser) {
            return (
                <div>
                    <Cards refreshAll={this.refreshAll} courses={this.state.courses} myCourses={this.state.myCourses}
                        myReviews={this.state.myReviews} user={this.state.user} />
                </div>
            );
        } else {
            return (
                <Login
                    value={legajo}
                    handleChange={(event) => {
                        const { value: user_id } = event.target;
                        this.setState({ user_id: user_id });
                    }}
                    submitUser={async () => {
                        const { user_id } = this.state;
                        if (user_id !== "") {
                            this.setState({ selectedUser: true });
                            const id = parseInt(user_id, 10);
                            const { data: user } = await getUser(id);
                            const myCourses = await getMyCourses(user_id);
                            const myReviews = await getMyReviews(user_id);
                            const myFriends = await getFriends(user_id);
                            const reviews = await this.renderCourseName(myReviews.data);
                            this.setState({ user, myCourses, myFriends });
                            this.setState({myReviews:reviews});
                            console.log("en render",reviews,this.state);

                        } else {
                            this.setState({ user: '' });
                        }
                    }}
                />

            );
        }
    }

    render() {
        return (
            <div>
                <Header 
                    handleSubmit={async () => {
                        console.log(this.state.user.usuario.legajo)
                        await addFriend(this.state.user.usuario.legajo,{
                            user_id: parseInt(this.state.friendLegajo)
                        })
                        const myFriends = await getFriends(this.state.user.usuario.legajo);
                        this.setState({ myFriends, friendLegajo:'' });
                    }}
                    handleTextfieldChange={(e) => this.setState({ friendLegajo: e.target.value })}
                    friendLegajo={this.state.friendLegajo}
                    user={this.state.user} 
                    selectedUser={this.state.selectedUser} myFriends={this.state.myFriends} />
                <Description />

                {/*<Cards courses={this.state.courses}/>*/}
                {this.renderLogin()}


            </div>
        )
    }
}




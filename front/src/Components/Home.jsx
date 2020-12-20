import React, { Component } from 'react'
import Header from './Header';
import Description from './Description';
import Cards from './Cards';
import Login from './Login';
import { getUserRecomendedCourses,getAllCourses, getHelloWorld, getMyCourses, getMyReviews, getUser, getFriends, addFriend } from '../services/apiService';

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
        friendLegajo:'',
        minScore:""
    }

    componentDidMount = async () => {
        const response = await getAllCourses();
        this.setState({ courses: response.data });
        // const user = await getUser(this.state.user_id);
    }

    refreshAll = async () => {
        const { user_id } = this.state;
        const id = parseInt(user_id, 10);
        const { data: user } = await getUser(id);
        const myCourses = await getMyCourses(user_id);
        const myFriends = await getFriends(user_id);
        const myReviews = await getMyReviews(user_id);
        this.setState({ user, myCourses, myReviews, myFriends });
    }

    renderLogin = () => {
        const { selectedUser, user_id: legajo } = this.state;

        if (selectedUser) {
            return (
                <div>
                    <Cards refreshAll={this.refreshAll} courses={this.state.courses} myCourses={this.state.myCourses}
                        myReviews={this.state.myReviews.data} user={this.state.user}
                        myRecom={this.state.myRecom} 
                        handleMinScoreChange={(e) => this.setState({ minScore:e.target.value })} 
                        minScore={this.state.minScore} 
                        searchRecomendations={async() => {
                            let { minScore } = this.state;
                            minScore = parseInt(minScore);
                            const { data:myRecom } = await getUserRecomendedCourses(this.state.user.usuario.legajo, minScore)
                            console.log("myrecom ", myRecom)
                            this.setState({ myRecom: myRecom.recommendations })
                        }} />
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
                            this.setState({ user, myCourses, myReviews, myFriends });

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




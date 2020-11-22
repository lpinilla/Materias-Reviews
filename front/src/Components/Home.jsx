import React, { Component } from 'react'
import Header from './Header';
import Description from './Description';
import Cards from './Cards';
import Login from './Login';

export default 
class Home extends Component {
    state={
        user_id: '',
        name:'',
        lastName:'',
        selectedUser:false
    }
    renderLogin = () => {
        const { selectedUser, user_id: legajo } = this.state;
        if(selectedUser){
            return(
                <div>
                    <Cards  />
                </div>
            );
        }else{
            return(
                <Login 
                    value={legajo} 
                    handleChange={(event) => {
                        const { value: user_id } = event.target;
                        this.setState({ user_id })
                    }} 
                    submitUser={() => this.setState({ selectedUser: true })}
            />)
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Description />
                {this.renderLogin()}
                
            </div>
        )
    }
}



        
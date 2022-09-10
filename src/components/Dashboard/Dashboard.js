import React from 'react';
import { getAuth } from "firebase/auth";
const Dashboard = () => {
    // const user = firebase.auth().currentUser;
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        
        <div>
            <h1>Profile</h1>
            <img style={{borderRadius:'50%',border:'1px solid #000',height:'120px'}} src={user.photoURL} alt="Profile"/>
            <h4>Name : {user.displayName}</h4>
            <h4>Email Address : {user.email}</h4>
        </div>
    );
};

export default Dashboard;
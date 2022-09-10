import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendEmailVerification,updateProfile } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Image from '../../img/draw2.webp'
const SignUp = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth)

    const verifyEmail = () => {
        
        sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            // ...
        }).catch(function(error){
            // An error happened.
        });
}   
    const handleNameBlur = event =>{
        setName(event.target.value);
    }
    console.log(name);
    const handleEmailBlur = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordBlur = event =>{
        setPassword(event.target.value);
    }

    const handleConfirmPasswordBlur = event =>{
        setConfirmPassword(event.target.value);
    }

    if(user){
        verifyEmail();
    }

    const handleCreateUser = event =>{
        event.preventDefault();
        
        if(password !== confirmPassword){
            setError('Your two passwords did not match');
            return;
        }
        if(password.length <6){
            setError('Password must be 6 characters or longer');
            return;
        }
        
        createUserWithEmailAndPassword(email, password)
       .then(()=>{
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            navigate('/dashboard');
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
       })
    }

    return (
        <div>
            <section className="vh-100 mt-5">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img className='img-fluid' src={Image} alt="" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                        <form onSubmit={handleCreateUser}>
                        <div className="form-outline mb-4">
                            <input type="text" onChange={handleNameBlur} id="name" className="form-control form-control-lg"
                            placeholder="Enter Your Name" required/>
                        </div>    
                        
                        <div className="form-outline mb-4">
                            <input type="email" id="email" onChange={handleEmailBlur} className="form-control form-control-lg"
                            placeholder="Enter Your Email Address" required/>
                        </div>

                        <div className="form-outline mb-3">
                            <input type="password" id="password" onChange={handlePasswordBlur} className="form-control form-control-lg"
                            placeholder="Enter Your Password" required/>
                        </div>

                        <div className="form-outline mb-3">
                            <input type="password" id="password" onChange={handleConfirmPasswordBlur} className="form-control form-control-lg"
                            placeholder="Enter Your Confirm Password" required/>
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                        <p style={{color: 'red'}}>{error}</p>
                            <button type="submit" className="btn btn-primary btn-lg">SignUp</button>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
          
            </section>
        </div>
    );
};

export default SignUp;
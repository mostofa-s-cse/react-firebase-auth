import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from '../../firebase.init';
import './Login.css';
import Image from '../../img/draw2.webp'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
const Login = () => {
    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleEmailBlur = event => {
        setEmail(event.target.value);
    }

    const handlePasswordBlur = event => {
        setPassword(event.target.value);
    }

    if (user) {
        navigate(from, {replace: true});
    }

    const handleUserSignIn = event => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    const googleSignIn = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            if (user) {
                navigate(from, {replace: true});
            }
        
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

    }
    return (
        <div className=''>
            <section className="vh-100 mt-5">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img className='img-fluid' src={Image} alt="" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleUserSignIn}>
                            
                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                            <button type="button" onClick={googleSignIn} className="btn btn-primary btn-floating mx-1">
                             <GoogleIcon />
                            </button>
                            <button type="button" className="btn btn-primary btn-floating mx-1">
                            <FacebookIcon />
                            </button>
                            <button type="button" className="btn btn-primary btn-floating mx-1">
                            <GitHubIcon />
                            </button>
                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>

                        
                        <div className="form-outline mb-4">
                            <input type="email" id="email" onBlur={handleEmailBlur} className="form-control form-control-lg"
                            placeholder="Enter a valid email address" required/>
                        </div>

                        
                        <div className="form-outline mb-3">
                            <input type="password" id="password" onBlur={handlePasswordBlur} className="form-control form-control-lg"
                            placeholder="Enter password" required/>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                        
                            <div className="form-check mb-0">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label className="form-check-label" htmlFor="form2Example3">
                                Remember me
                            </label>
                            </div>
                            <a href="#!" className="text-body">Forgot password?</a>
                        </div>
                                <p style={{ color: 'red' }}>{error?.message}</p>
                            {
                                loading && <p>Loading...</p>
                            }
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" className="btn btn-primary btn-lg">Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?<Link className="link-danger" to="/signup"> Register</Link> </p>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
          
            </section>
        </div>
        
    );
};

export default Login;
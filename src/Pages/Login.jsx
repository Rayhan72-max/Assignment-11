import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { GithubAuthProvider } from "firebase/auth";
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate();
    const gitprovider = new GithubAuthProvider();
    const {signIn,forgetPass,auth,provider} = useContext(AuthContext);
    const handleLogin =(e)=>{
        e.preventDefault()
         
        const password= e.target.password.value;
        const email= e.target.email.value;
        const user = {password,email}
        signIn(email,password)
        .then(axios.post('http://localhost:5000/jwt',user,{withCredentials:true}))
        .then(()=>navigate("/"))    
        .catch(err=>   
            Swal.fire({title: "Invalid Credential!",
                        icon: "error",
                        text:"invalid password or email"
                        }))
        
    }

    const handleForget = () =>{
        const email = document.getElementById("form").email.value;
        if(email !== ""){}
        navigate(`/forget/${email}`)
    }
    
    const handleGoogle=()=>{
        signInWithPopup(auth,provider)
        .then(()=>navigate("/"))
    }
    const handleGithub=()=>{
        signInWithPopup(auth,gitprovider)
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form id='form' onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6 flex flex-col">
                               <button type='submit' className="btn btn-primary">Login</button>
                               <button onClick={handleForget} className='btn btn-primary w-full mt-2'>Forget Password</button>
                                <button className='btn btn-outline btn-success  text-3xl text-yellow-400 font-bold p-2 mt-2' onClick={handleGoogle}>Google Login</button>
                                <button className='btn bg-black  text-3xl text-white font-bold p-2 mt-2' onClick={handleGithub}>Github Login</button>
                                <Link className='btn btn-primary mt-2' to="/register"><button >SignUp</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
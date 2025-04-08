import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, updateProfile, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from '../../firebase.config';

export const AuthContext = createContext();
  const provider =  new GoogleAuthProvider();
  

const AuthProvider = ({children}) => {
    const [grid,setGrid] = useState(true)
    const [theme,setTheme] = useState(false)
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState({});   
    const [campaigns, setCampaigns] = useState([])


    
const signUp =(email,password)=> createUserWithEmailAndPassword(auth, email, password);


const logOut =()=> signOut(auth)



const signIn =(email,password)=> 
signInWithEmailAndPassword(auth, email, password)


useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth,(user) => {
    if (user) {
        setUser(user)
        
      
      const uid = user.uid;
      
    } else {
      setUser("")
      // User is signed out
      // ...
    }
  })
  return ()=>unSubscribe();
},[])

const forgetPass = (email) =>{
  sendPasswordResetEmail(auth,email)
}



    
    const userInfo = {
        signUp,
        auth,
        provider,
        signIn,
        forgetPass,
        user,
        logOut,
        campaigns,
        loading,
        setLoading,
        theme,
        setTheme,
        setCampaigns,
        grid,
        setGrid,
    }

    
    
    return (
        <AuthContext.Provider value={userInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState,useEffect } from 'react';
import { app, db } from '../Firebase';

export default function OnAuthStateChange() {
    const auth = getAuth();
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
      onAuthStateChanged(auth,(data)=>{
        if(data) alert("Logged In");
        else alert("Logged OUt");
      })
    }, [])
    

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setData(p => {
            if (name === 'email') return { email: value, password: p.password }
            return { email: p.email, password: value };
        })
    }

    const handleLogin = () => {
        try{

            signInWithEmailAndPassword(auth,data.email,data.password);
        }
        catch(e){
            alert(e);
        }
    }
    const handleLogout=()=> {
        signOut(auth);
    }
    const handleFormSubmit=(e)=>{
        e.preventDefault();
    }
    return (
        <form onClick={handleFormSubmit}>
            <input onChange={handleInputChange} type="email" name='email' placeholder='Enter Your Email' />
            <input onChange={handleInputChange} type="password" name="password" placeholder='Enter Your password' />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </form>
    )
}

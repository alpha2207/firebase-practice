import React, { useState } from 'react';
import { app, db } from '../Firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDocs,deleteDoc,doc  } from "firebase/firestore";


export default function App() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setData(p => {
            if (name === 'email') return { email: value, password: p.password }
            return { email: p.email, password: value };
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(doc._document.data.value.mapValue.fields);
        });

    }
    const updateData=async (e)=>{
        try{
            await deleteDoc(doc(db, "users",'oObRu1P6laoiWekNGIio'));
        }
        catch(e){
            alert(e.message);
        }

    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input onChange={handleInputChange} type="email" name='email' placeholder='Enter Your Email' />
            <input onChange={handleInputChange} type="password" name="password" placeholder='Enter Your password' />
            <button onClick={updateData}>Submit</button>
        </form>
    )
}

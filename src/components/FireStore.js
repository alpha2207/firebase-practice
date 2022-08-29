import React, { useState } from 'react';
import { app, db } from '../Firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";


export default function App() {
    let collectionRef = collection(db, 'users');
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
        try {
            await addDoc(collectionRef, {
                password: data.password,
                email: data.email
            }
            )
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleGetDocs = async (e) => {
        e.preventDefault();
        try{
            let res=await getDocs(collectionRef);
            console.log(res.docs.map(item=>{
                return item.data();
            }));
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input onChange={handleInputChange} type="email" name='email' placeholder='Enter Your Email' />
            <input onChange={handleInputChange} type="password" name="password" placeholder='Enter Your password' />
            <button onClick={handleFormSubmit}>Submit</button>
            <button onClick={handleGetDocs}>GetDocs</button>
        </form>
    )
}

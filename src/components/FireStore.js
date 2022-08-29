import React, { useState, useEffect } from 'react';
import { app, db } from '../Firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";


export default function App() {
    let collectionRef = collection(db, 'users');
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        handleGetDocs();
    }, [])


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
            console.log("Document Added");
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleGetDocs = async (e) => {
        try {
            // let res = await getDocs(collectionRef);
            // console.log(res.docs.map(item => {
            //     return item.data();
            // }));
            onSnapshot(collectionRef, data => {
                (data.docs.map(item => {
                    console.log(item.data());
                }));
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    const handleQueryData=()=>{
        const mailQuery=query(collectionRef,where('email','==','fadfa@gmail.com'));
        onSnapshot(mailQuery, data => {
            (data.docs.map(item => {
                console.log(item.data());
            }));
        })

    }
    return (
        <div onSubmit={handleFormSubmit}>
            <input onChange={handleInputChange} type="email" name='email' placeholder='Enter Your Email' />
            <input onChange={handleInputChange} type="password" name="password" placeholder='Enter Your password' />
            <button onClick={handleFormSubmit}>Submit</button>
            <button onClick={handleGetDocs}>GetDocs</button>

            <button onClick={handleQueryData}>Query Data</button>
        </div>
    )
}

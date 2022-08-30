import { app, db } from '../Firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function FireStoreMain() {
    let auth = getAuth();
    let collectionRef = collection(db, 'users');

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [docsArray, setdocsArray] = useState([]);

    useEffect(()=>{
        getDocuments();
    },[])

    const handleInputChange = (e) => {
        let inputs = {
            [e.target.name]: e.target.value
        }
        setData({ ...data, ...inputs });
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let user = await addDoc(collectionRef, data);
        // console.log(user);
    }


    const getDocuments = async () => {
        onSnapshot(collectionRef,(user)=>{
            user.docs.map(item => {
                setdocsArray(p => [...p, item])
            })
        });
        
    }
    const handleDeleteDoc = async (id) => {
        let user = await deleteDoc(doc(db, 'users', id));
        console.log(user);
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name='name' onChange={handleInputChange} />
                <input type="email" name='email' onChange={handleInputChange} />
                <input type="password" name='password' onChange={handleInputChange} />

                <button type='Submit'>Submit</button>

            </form>
            <button onClick={getDocuments}>getDocuments</button>
            {docsArray.map(item => {
                return (<div key={item.id}>
                    <p>{item.id}</p>
                    <p>Name : {item.data().name}</p>
                    <p>Email : {item.data().email}</p>
                    <p>Password : {item.data().password}</p>
                    <button onClick={() => handleDeleteDoc(item.id)}>Delete This Doc</button>
                    <hr />
                </div>)
            })}
        </div>
    )
}

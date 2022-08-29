import React, { useState } from 'react';
import { app, db } from '../Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export default function App() {
    const [data, setData] = useState()
    const [imgurl, setimgurl] = useState('');
    const [uploadPercentage,setuploadPercentage]=useState('');

    const storage = getStorage();
    
    
    const handleInputChange = () => {
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const storageRef = ref(storage,data.name);
        const uploadTask = uploadBytesResumable(storageRef, data);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setuploadPercentage('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error.message);
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setimgurl(downloadURL);
                });
            }
        );

    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={(e) => { setData(e.target.files[0]) }} />
            <button type='submit'>Submit</button><br/>
            <p>{uploadPercentage}</p>
            <img style={{width:'600px',height:'auto'}} src={imgurl} alt={data && data.name} />
        </form>
    )
}

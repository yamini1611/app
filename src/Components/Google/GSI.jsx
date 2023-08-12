import React, { createContext, useCallback, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const UserContext = createContext();

const GSI = ({ children }) => {
    const [user, setUser] = useState({});
    const handleCallbackResponse = (response) => {
        console.log(response.credential);
        var userObject = jwt_decode(response.credential);
        setUser(userObject);

    }
    console.log(user);
    axios.post("http://localhost:4000/Register", {
        fullName: user.name,
        email: user.email,
        image: user.picture
    }).catch((error)=>{
       console.log(error)
    })
    const fetchData = (user) => {

    
        fetch("http://localhost:4000/Register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: user.name,
                email: user.email,
                image: user.picture
            })
        })
            .then((response) => {
                console.log(response.status);
            }).catch((error) => { })
    }

    useEffect(() => {
        console.log(user);
        /* global google */
        google.accounts.id.initialize({
            client_id: "750979981357-niapbt49f70mgcgmt4e8ci6h1hddoeme.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: "outline", size: "large"
            }

        );
        google.accounts.id.prompt()
        console.log(user.name)

    }, [])
    return (
        <div>
        
                <div id="signInDiv"></div>
        </div>
    )
}

export default GSI
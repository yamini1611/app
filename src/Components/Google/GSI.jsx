import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext();

const GSI = ({children}) => {
    const [user, setUser] = useState({});
    const handleCallbackResponse = (response) => {
        console.log(response.credential);
        var  userObject = jwt_decode(response.credential);
        setUser(userObject);
        
    }
console.log(user);
    const fetchData = () => {
        fetch("http://localhost:4000/Register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        })
            .then((response) => {
                console.log(response.status);
            })
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
                theme: "outline", size: "medium"
            }
        );

        // google.accounts.id.prompt();

       
      
    }, [])
    return (
        <div>
            <UserContext.Provider value={user}>
                {console.log(user)}
            {children}
            <div id="signInDiv"></div>
            </UserContext.Provider>
        </div>
    )
}

export default GSI
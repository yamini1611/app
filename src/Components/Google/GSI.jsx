import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
const GSI = () => {
    const [user , setUser] = useState({});
const handleCallbackResponse  =(response)=>{
 console.log(response.credential);
var userObject = jwt_decode(response.credential);
console.log(userObject);
setUser(userObject);

}

useEffect(()=>{
    /* global google */
google.accounts.id.initialize({
    client_id:"750979981357-niapbt49f70mgcgmt4e8ci6h1hddoeme.apps.googleusercontent.com",
    callback: handleCallbackResponse
}) ;

google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {
        theme:"outline",size:"medium"
    }
);


},[])
  return (
    <div>

        <div id="signInDiv"></div>
    

    </div>
  )
}

export default GSI
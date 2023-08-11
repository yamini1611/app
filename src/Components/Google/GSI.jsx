import React, { useEffect, useState } from 'react'

const GSI = () => {
    const [user , setUser] = useState({});
const handleCallbackResponse  =(response)=>{
 console.log(response.credentials);
}

useEffect(()=>{
google.account.id.initialize({
    client_id:"750979981357-niapbt49f70mgcgmt4e8ci6h1hddoeme.apps.googleusercontent.com",
    callback: handleCallbackResponse
}) ;

google.account.id.renderButton(
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
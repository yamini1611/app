import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GSI = (props) => {
    const [user, setUser] = useState({});
    var loginDetails;


    const handleCallbackResponse = (response) => {
    console.log(response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    createAccount(userObject);
  };
  console.log(user);


  const createAccount = (user) => {
console.log(user)
    if(props.axios==="post"){

      axios.get(`http://localhost:4000/GoogleSignIn/?email=${user.email}`)
      .then((response) => {
        if(response.data.length>0){
          alert("Account already exists")
        }else{
          axios
          .post("http://localhost:4000/GoogleSignIn", {
            fullName: user.name,
            email: user.email,
            image: user.picture,
            isLogged: false,
          })
          .then(() => {
            toast.success("Account Created Successfully!");
          })
          .then(() => {
            setTimeout(() => {
              window.location.href = "/";
            }, 0);
          })
          .catch((error) => {
            console.log(error);
          });
        }

      })

        
    }else if (props.type==="login"){
    
        console.log(user.email)
          axios.get(`http://localhost:4000/GoogleSignIn/?email=${user.email}`)
          .then((response) => {
            console.log(`http://localhost:4000/GoogleSignIn/?email=${user.email}`)
            console.log(response.data[0])
            loginDetails = response.data[0];
            console.log("This is the login details"+loginDetails);
          })
          .then(() => {
              axios.put(`http://localhost:4000/GoogleSignIn/${loginDetails.id}`, {
                fullName: loginDetails.fullName,
                email: loginDetails.email,
                isLogged: true,
                password: loginDetails.password,
              })
          })
        .then(() => {
          toast.success("Account logged in Successfully!");
        })
        .then(() => {
          setTimeout(() => {
            window.location.href = "/";
          }, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
  };




useEffect(() => {
    console.log(props.axios);
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "750979981357-niapbt49f70mgcgmt4e8ci6h1hddoeme.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
    console.log(user.name);
  }, []);

  

  return (
    <div>
      <div id="signInDiv"></div>
      <ToastContainer/>
    </div>
  );
};

export default GSI;

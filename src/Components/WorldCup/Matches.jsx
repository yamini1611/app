import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/Matches.css';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/schedule")
      .then((response) => {
        setMatches(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("An Error Occurred", error);
      });
  }, []);

  return (
    <div className="body">
   
      <div className="container ">
      <h2 className="text-white fw-bold">ALL WORLD CUP MATCHES</h2>
        <div className="row">
          {matches.map((match) => (
            <div key={match.id} className="col-6 col-md-3 mb-4">
              <div className="card mt-5 card-full">
                <img
                  src={match.cover}
                  alt="match"
                  className="card-img-top"
                />
                <div className="card-body">
                 
                  {/* <h5 className="card-title fs-6 fw-bold">{match.match}</h5> */}
                  <p className="card-subtitle mb-2 text-muted">{match.venue}</p>
                  <div className="row">
                  <p className="card-text col-7  text-success ">
                  
                    ₹{match.price} onwards
                    </p>
                    <span className="match-date col-5  ">{match.Date}</span>
                    </div>
               
                 
                 
                  <button className="btn btn-danger w-100 align-item-bottom">Book</button>
                  </div>
             
              </div>
           
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Matches;

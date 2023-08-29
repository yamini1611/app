import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/Matches.css'

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
        console.log("An Error Occured", error);
      });
  }, []);

  return (
    <body className="body">
        
  
    <div className="container">
      <div className="row">
        {matches.map((match) => (
          <div key={match.id} className="col-md-3 mb-4">
            <div className="card my-card" >
              <img src={match.cover} className="card-img-top" alt="CWC" />
              <div className="card-body my-card">
                <h5 className="card-title my-card">₹{match.price} Onwards</h5>
                <p className="card-tex my-cardt">{match.match}</p>
                <button className="btn btn-primary">Book Tickets</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </body>
  );
};

export default Matches;

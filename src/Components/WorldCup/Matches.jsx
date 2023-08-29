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

      <div className="container schedule-container">
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
                  <h5 className="card-title">{match.match}</h5>
                  <p className="card-subtitle mb-2 text-muted">{match.venue}</p>
                  <p className="card-text">
                    <span className="match-date">{match.Date}</span>
                    <br />
                    ₹ {match.price} onwards
                  </p>
                  <a href="#" className="btn btn-danger w-100">Book</a>
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

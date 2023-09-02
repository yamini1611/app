import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import "../styles/Matches.css";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const country = queryParams.get("country");
    const venue = queryParams.get("venue");

    // Build the URL based on the selected country or venue
    let url = "http://localhost:4000/schedule";

    axios
      .get(url)
      .then((response) => {
        let filteredMatches = response.data;

        if (country) {
          filteredMatches = filteredMatches.filter(
            (match) =>
              match.Team1.toUpperCase() === country.toUpperCase() ||
              match.Team2.toUpperCase() === country.toUpperCase()
          );
        } else if (venue) {
          filteredMatches = filteredMatches.filter(
            (match) => match.location.toLowerCase() === venue.toLowerCase()
          );
        }

        setMatches(filteredMatches);
        console.log("Matches Data:", filteredMatches);
      })
      .catch((error) => {
        console.log("An Error Occurred", error);
      });
  }, [location]);

  return (
    <div className="body">
      <div className="container">
        <h2 className="text-white fw-bold">ALL WORLD CUP MATCHES</h2>
        <div className="row">
          {matches.length > 0 ? (
            matches.map((match) => (
              <div key={match.id} className="col-6 col-md-3 mb-4">
                <div className="card mt-5 card-full">
                  <img
                    src={match.cover}
                    alt="match"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-subtitle mb-2 text-muted">
                      {match.venue}
                    </p>
                    <div className="row">
                      <p className="card-text col-7 text-success">
                        ₹{match.price} onwards
                      </p>
                      <span className="match-date col-5">{match.Date}</span>
                    </div>
                    <Link to="/ChooseTickets"><button className="btn btn-danger w-100 align-item-bottom">
                      Book
                    </button></Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 mt-3">
              No matches found for the selected criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matches;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ThetreList.css";
import { Link } from "react-router-dom";

const TheatreList = () => {
  const [selectedLocation, setSelectedLocation] = useState("chennai");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [theaterData, setTheaterData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/ThetreList")
      .then((response) => {
        setTheaterData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching theater data:", error);
      });
  }, []);

  const filteredTheaters = theaterData.filter((theater) => {
    return (
      theater.location.toLowerCase() === selectedLocation &&
      (selectedMovie === "" || theater.MoviesRunning1 === selectedMovie)
    );
  });

  return (
    <div id="theatre-list" className="theatre-list-container">
      <h1 className="heading">Theatres</h1>
      <div className="label-container">
      {/* Location selection dropdown */}
      </div>
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card" id='card'>
            <div className="row">
              <div className="col-7">
              <h3 className="theatre-name">{theater.Name}</h3>
            <img src={theater.cover} alt={`${theater.Name} Cover`} className="cover-image" />
              </div>
              <div className="col">
              <p>
              <span className="movie-name">{theater.MoviesRunning1}</span>
            </p>
            <div className="show-times">
              <p>
                <strong>Show Timings:</strong>
              </p>
              <Link to="/ChooseTickets" className="text-decoration-none">
             
                <ul className="show-list no-underline">
                  <li>{theater.show1}</li>
                  <li>{theater.show2}</li>
                  <li>{theater.show3}</li>
                  <li>{theater.show4}</li>
                  <li>{theater.show5}</li>
                </ul>
              </Link>
            </div>
              </div>
              </div>
              
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheatreList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ThetreList.css";
import { Link } from "react-router-dom";

const SelectedTheaters = () => {
  const [selectedLocation, setSelectedLocation] = useState(["chennai" ,"mumbai" ,"hydrabad","cochin"]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [theaterData, setTheaterData] = useState([]);

  useEffect(() => {
    // Fetch theater list from the API
    axios.get('http://localhost:4000/ThetreList')
      .then(response => {
        // Convert selectedLocation to lowercase for case-insensitive comparison
        const lowerCaseSelectedLocation = selectedLocation.toLowerCase();

        console.log('Selected location:', selectedLocation);
        console.log('Selected movie:', selectedMovie);
        console.log('Theater data:', response.data);

        // Filter theaters based on selected location and movie
        const filteredTheaters = response.data.filter(theater =>
          theater.location.toLowerCase() === lowerCaseSelectedLocation && theater.MoviesRunning1.includes(selectedMovie)
        );

        console.log('Filtered theaters:', filteredTheaters);

        setTheaterData(filteredTheaters);
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
      <h1 className="heading">Theatre List</h1>
      <div className="label-container">
        <label className="label" htmlFor="locationSelect">
          Select Location:
        </label>
        <select
          className="select-box"
          id="locationSelect"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="chennai">Chennai</option>
          <option value="mumbai">Mumbai</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="cochin">Cochin</option>
        </select>
      </div>
      <div className="label-container">
        <label className="label" htmlFor="movieSelect">
          Select Movie:
        </label>
        <select
          className="select-box"
          id="movieSelect"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="">All Movies</option>
          <option value="Jailer">Jailer</option>
          <option value="Gadar 2: The Katha Continues">Gadar 2: The Katha Continues</option>
          <option value="OMG 2">OMG 2</option>
          <option value="Oppenheimer">Oppenheimer</option>
        </select>
      </div>
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card" id='card'>
            <h3 className="theatre-name">{theater.Name}</h3>
            <p>
              <strong>Location:</strong> {theater.location}
            </p>
            <p>
              <strong>Movies Running:</strong> {theater.MoviesRunning1}
            </p>
            <div className="show-times">
              <p>
                <strong>Show Times:</strong>
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
        ))}
      </div>
    </div>
  );
};


export default SelectedTheaters;
